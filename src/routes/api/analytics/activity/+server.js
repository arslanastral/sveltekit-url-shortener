import { json } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';

export async function GET({ locals, url }) {
  const currentUser = locals.user;
  const time = url.searchParams.get('time');
  const id = url.searchParams.get('id');

  if (!currentUser.authenticated) {
    return json({ error: 'Unauthorized' }, {
      status: 401
    });
  }

  let timeFilter;

  if (time === 'weekly') {
    timeFilter = new Date(new Date().setDate(new Date().getDate() - 7));
  } else {
    timeFilter = new Date(new Date().setHours(0, 0, 0, 0));
  }

  let timeQuery = { timestamp: { $gte: timeFilter } };
  let linkQuery = { 'metadata.short_url': id };

  let hourlyData = { $hour: '$timestamp' };
  let weeklyData = { $dayOfMonth: '$timestamp' };

  try {
    const collection = await useCollection('analytics');

    if (id) {
      let link = await collection.findOne(linkQuery);

      if (!link) {
        return json({ error: 'Link not found' }, {
          status: 404
        });
      }
    }

    let analyticsPipeline = [
      {
        $match: {
          'metadata.created_by': currentUser.email,
          ...(id && linkQuery),
          ...(time !== 'all' && timeQuery)
        }
      },

      {
        $group: {
          _id: {
            ...((time === 'weekly' || time === 'all') && weeklyData),
            ...(time !== 'weekly' && hourlyData)
          },
          count: { $sum: 1 },
          date: { $last: '$timestamp' }
        }
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          count: '$count',
          date: '$date'
        }
      }
    ];

    const activity = await collection.aggregate(analyticsPipeline).toArray();

    throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
    // Suggestion (check for correctness before using):
    // return json(activity);
    return {
      status: 200,
      body: activity
    };
  } catch (error) {
    return json({ error: 'Internal Server Error' }, {
      status: 500
    });
  }
}

import { useCollection } from '$lib/utils/useCollection';

export async function get({ locals, url }) {
  const currentUser = locals.user;
  const time = url.searchParams.get('time');
  const id = url.searchParams.get('id');

  if (!currentUser.authenticated) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  let timeFilter;

  if (time === 'weekly') {
    timeFilter = new Date(new Date().setDate(new Date().getDate() - 7));
  } else {
    timeFilter = new Date(new Date().setHours(0, 0, 0, 0));
  }

  let timeQuery = { timestamp: { $gte: timeFilter } };
  let linkQuery = { 'metadata.short_url': id };

  let hourlyData = { hour: { $hour: '$timestamp' } };
  let weeklyData = { day: { $dayOfMonth: '$timestamp' } };

  try {
    const collection = await useCollection('analytics');

    if (id) {
      let link = await collection.findOne(linkQuery);

      if (!link) {
        return {
          status: 404,
          body: { error: 'Link not found' }
        };
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
          date: { $first: '$timestamp' }
        }
      },
      {
        $project: {
          _id: 0,
          count: '$count',
          date: '$date'
        }
      }
    ];

    const activity = await collection.aggregate(analyticsPipeline).toArray();

    return {
      status: 200,
      body: activity
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: 'Internal Server Error' }
    };
  }
}

import { useCollection } from '$lib/utils/useCollection';

export async function get({ locals, url }) {
  const currentUser = locals.user;
  const time = url.searchParams.get('time');

  if (!currentUser.authenticated) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  let timeFilter;

  if (time === 'week') {
    timeFilter = new Date(new Date().setDate(new Date().getDate() - 7));
  } else {
    timeFilter = new Date(new Date().setHours(0, 0, 0, 0));
  }

  let timeQuery = { timestamp: { $gte: timeFilter } };

  try {
    const collection = await useCollection('analytics');

    let analyticsPipeline = [
      {
        $match: {
          'metadata.created_by': currentUser.email,
          ...(time !== 'all' && timeQuery)
        }
      },
      {
        $group: {
          _id: {
            location: '$location'
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $project: {
          _id: 0,
          count: '$count',
          location: '$_id.location'
        }
      }
    ];

    const links = await collection.aggregate(analyticsPipeline).toArray();

    return {
      status: 200,
      body: links
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: 'Internal Server Error' }
    };
  }
}

import { useCollection } from '$lib/utils/useCollection';

export async function get({ locals }) {
  const currentUser = locals.user;

  if (!currentUser.authenticated) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  try {
    const collection = await useCollection('analytics');

    // if (id) {
    //   let link = await collection.findOne(linkQuery);

    //   if (!link) {
    //     return {
    //       status: 404,
    //       body: { error: 'Link not found' }
    //     };
    //   }
    // }

    let analyticsPipeline = [
      {
        $match: {
          'metadata.created_by': currentUser.email
          //   ...(id && linkQuery),
          //   ...(time !== 'all' && timeQuery)
        }
      },

      {
        $group: {
          _id: { day: { $dayOfMonth: '$timestamp' }, hour: { $hour: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          count: '$count',
          day: '$_id.day',
          hour: '$_id.hour'
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

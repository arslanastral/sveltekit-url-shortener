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

    let analyticsPipeline = [
      {
        $match: {
          'metadata.created_by': currentUser.email,
          timestamp: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }
      },
      {
        $project: {
          _id: 0
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

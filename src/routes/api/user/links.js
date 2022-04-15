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
    const collection = await useCollection('urls');

    const links = await collection
      .find({ created_by: currentUser.email })
      .project({
        date: { $toDate: '$_id' },
        _id: 0,
        long_url: 1,
        short_url: 1,
        secured: 1,
        clicks: 1
      })
      .toArray();

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

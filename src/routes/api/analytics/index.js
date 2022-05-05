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

    const links = await collection
      .find({ 'metadata.created_by': currentUser.email })
      .sort({ _id: -1 })
      .project({
        _id: 0
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

import { useCollection } from '$lib/utils/useCollection';

export async function get({ locals, url }) {
  const currentUser = locals.user;
  const page = url.searchParams.get('page') ?? 0;
  const linksPerPage = 10;

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
      .sort({ _id: -1 })
      .skip(page * linksPerPage)
      .limit(linksPerPage)
      .project({
        created_at: { $toDate: '$_id' },
        _id: 0,
        long_url: 1,
        short_url: 1,
        secured: 1,
        clicks: 1,
        tags: 1
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

import { useCollection } from '$lib/utils/useCollection';

export async function patch({ locals, request }) {
  const currentUser = locals.user;

  if (!currentUser.authenticated) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  const body = await request.json();
  const { short_url, tags } = await body;

  try {
    const collection = await useCollection('urls');

    const link = await collection.findOne({ short_url: short_url });

    if (link) {
      let updatedLink = await collection.updateOne(
        { short_url: short_url },
        { $set: { tags: tags } }
      );

      console.log(updatedLink);

      return {
        status: 200,
        body: {
          short_url: updatedLink.short_url,
          long_url: updatedLink.long_url,
          tags: updatedLink.tags
        }
      };
    }
    return {
      status: 400,
      body: { error: 'No such link' }
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: 'Internal Server Error' }
    };
  }
}

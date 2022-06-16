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

    let updated = await collection.findOneAndUpdate(
      { short_url: short_url },
      { $set: { tags: tags } },
      { returnDocument: 'after' }
    );

    let updatedLink = updated.value;

    if (!updatedLink) {
      return {
        status: 400,
        body: { error: 'No such link' }
      };
    }

    return {
      status: 200,
      body: {
        long_url: updatedLink.long_url,
        short_url: updatedLink.short_url,
        clicks: updatedLink.clicks,
        secured: updatedLink.secured,
        tags: updatedLink.tags,
        created_at: updatedLink._id.getTimestamp()
      }
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: 'Internal Server Error' }
    };
  }
}

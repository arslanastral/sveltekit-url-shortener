import { json as json$1 } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';

export async function PATCH({ locals, request }) {
  const currentUser = locals.user;

  if (!currentUser.authenticated) {
    return json$1({ error: 'Unauthorized' }, {
      status: 401
    });
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
      return json$1({ error: 'No such link' }, {
        status: 400
      });
    }

    return json$1({
  long_url: updatedLink.long_url,
  short_url: updatedLink.short_url,
  clicks: updatedLink.clicks,
  secured: updatedLink.secured,
  tags: updatedLink.tags,
  created_at: updatedLink._id.getTimestamp()
});
  } catch (error) {
    return json$1({ error: 'Internal Server Error' }, {
      status: 500
    });
  }
}

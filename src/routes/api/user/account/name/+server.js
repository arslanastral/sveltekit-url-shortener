import { json as json$1 } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';

export async function PATCH({ locals, request }) {
  const body = await request.json();
  const { name } = await body;
  const currentUser = locals.user.email || null;
  const isDemoUser = currentUser === 'demo@ky.com';

  if (!currentUser) {
    return json$1({
  error: 'Not logged in'
}, {
      status: 400
    });
  }

  if (isDemoUser) {
    return json$1({
  error: 'Cannot update demo user'
}, {
      status: 400
    });
  }

  try {
    const collection = await useCollection('users');

    const user = await collection.findOne({ email: { $eq: currentUser } });

    if (user) {
      await collection.updateOne(
        { email: currentUser },
        {
          $set: {
            name: name
          }
        }
      );

      return json$1({
  name: name
});
    }
  } catch (error) {
    return json$1({
  error: 'Internal server error'
}, {
      status: 500
    });
  }
}

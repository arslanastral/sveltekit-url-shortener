import { json as json$1 } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';

export async function PATCH({ locals, request }) {
  const body = await request.json();
  const { email } = await body;
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
    const userLinks = await useCollection('urls');

    const user = await collection.findOne({ email: { $eq: currentUser } });

    if (user) {
      await userLinks.updateMany(
        { created_by: currentUser },
        {
          $set: {
            created_by: email
          }
        }
      );

      await collection.updateOne(
        { email: currentUser },
        {
          $set: {
            email: email
          }
        }
      );

      return json$1({
  email: email
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

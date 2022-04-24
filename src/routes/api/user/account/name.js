import { useCollection } from '$lib/utils/useCollection';

export async function patch({ locals, request }) {
  const body = await request.json();
  const { name } = await body;
  const currentUser = locals.user.email || null;

  if (!currentUser) {
    return {
      status: 400,
      body: {
        error: 'Not logged in'
      }
    };
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

      return {
        status: 200,
        body: {
          name: name
        }
      };
    }
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Internal server error'
      }
    };
  }
}

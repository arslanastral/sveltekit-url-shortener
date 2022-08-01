import { useCollection } from '$lib/utils/useCollection';

export async function PATCH({ locals, request }) {
  const body = await request.json();
  const { email } = await body;
  const currentUser = locals.user.email || null;
  const isDemoUser = currentUser === 'demo@ky.com';

  if (!currentUser) {
    return {
      status: 400,
      body: {
        error: 'Not logged in'
      }
    };
  }

  if (isDemoUser) {
    return {
      status: 400,
      body: {
        error: 'Cannot update demo user'
      }
    };
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

      return {
        status: 200,
        body: {
          email: email
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

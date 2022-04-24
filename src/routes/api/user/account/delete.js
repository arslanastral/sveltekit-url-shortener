import { useCollection } from '$lib/utils/useCollection';

export async function del({ locals }) {
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
    const users = await useCollection('users');
    const userLinks = await useCollection('urls');

    const user = await users.findOne({ email: { $eq: currentUser } });

    if (user) {
      await userLinks.deleteMany({ created_by: currentUser });

      await users.deleteOne({ email: currentUser });

      return {
        status: 200,
        body: {
          status: 'User Account Successfully Deleted'
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

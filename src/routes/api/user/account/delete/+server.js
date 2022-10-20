import { json } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';

export async function DELETE({ locals }) {
  const currentUser = locals.user.email || null;
  const isDemoUser = currentUser === 'demo@ky.com';

  if (!currentUser) {
    return json({
  error: 'Not logged in'
}, {
      status: 400
    });
  }

  if (isDemoUser) {
    return json({
  error: 'Cannot delete demo user'
}, {
      status: 400
    });
  }

  try {
    const users = await useCollection('users');
    const userLinks = await useCollection('urls');

    const user = await users.findOne({ email: { $eq: currentUser } });

    if (user) {
      await userLinks.deleteMany({ created_by: currentUser });

      await users.deleteOne({ email: currentUser });

      return json({
  status: 'User Account Successfully Deleted'
}, {
        headers: {
          'set-cookie': 'sessionId=deleted; path=/; Max-Age=0'
        }
      });
    }
  } catch (error) {
    return json({
  error: 'Internal server error'
}, {
      status: 500
    });
  }
}

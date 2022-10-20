import { json as json$1 } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';
import bcryptjs from 'bcryptjs';

export async function PUT({ locals, request }) {
  const body = await request.json();
  const { oldPass, newPass } = await body;
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
      if (await bcryptjs.compare(oldPass, user.password)) {
        const hash = await bcryptjs.hash(newPass, 10);

        await collection.updateOne(
          { email: currentUser },
          {
            $set: {
              password: hash
            }
          }
        );

        return json$1({
  status: 'Password Changed Successfully'
});
      }

      return json$1({
  status: 'Password Not Matched'
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

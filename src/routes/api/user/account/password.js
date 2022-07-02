import { useCollection } from '$lib/utils/useCollection';
import bcryptjs from 'bcryptjs';

export async function put({ locals, request }) {
  const body = await request.json();
  const { oldPass, newPass } = await body;
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

        return {
          status: 200,
          body: {
            status: 'Password Changed Successfully'
          }
        };
      }

      return {
        status: 200,
        body: {
          status: 'Password Not Matched'
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

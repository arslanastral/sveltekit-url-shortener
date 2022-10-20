import { json as json$1 } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';
import { isValidEmail } from '$lib/utils/isValidEmail';
import { insertDemoData } from '$lib/utils/insertDemoData';
import * as cookie from 'cookie';
import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST({ request }) {
  const body = await request.json();
  const { email, password } = await body;

  if (!email || !password) {
    return json$1({
  error: 'Missing email or password'
}, {
      status: 400
    });
  }

  if (!isValidEmail(email)) {
    return json$1({
  error: 'Invalid email'
}, {
      status: 400
    });
  }

  try {
    const collection = await useCollection('users');
    const user = await collection.findOne({ email: email });

    if (!user) {
      return json$1({
  error: 'No user with that email'
}, {
        status: 400
      });
    }

    if (await bcryptjs.compare(password, user.password)) {
      const sessionId = nanoid(36);

      if (email === 'demo@ky.com') {
        await insertDemoData();
      }

      await collection.updateOne(
        {
          _id: user._id
        },
        {
          $set: {
            sessionId: sessionId
          }
        }
      );

      const headers = {
        'Set-Cookie': cookie.serialize('sessionId', sessionId, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          sameSite: 'strict',
          secure: true
        })
      };

      return json$1({
  user: {
    name: user.name,
    email: user.email
  },
  message: 'signin successful'
}, {
        headers: headers
      });
    } else {
      return json$1({
  error: 'Incorrect email or password'
}, {
        status: 400
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

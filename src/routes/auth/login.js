import { connectToDatabase } from '$lib/utils/connectToDatabase.js';
import { isValidEmail } from '$lib/utils/isValidEmail';
import * as cookie from 'cookie';
import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function post({ request }) {
  const body = await request.json();
  const { email, password } = await body;

  if (!email || !password) {
    return {
      status: 400,
      body: {
        error: 'Missing email or password'
      }
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: 400,
      body: {
        error: 'Invalid email'
      }
    };
  }

  try {
    const db = await connectToDatabase();
    const collection = await db.collection('users');
    const user = await collection.findOne({ email: email });

    if (!user) {
      return {
        status: 400,
        body: {
          error: 'No user with that email'
        }
      };
    }

    if (await bcryptjs.compare(password, user.password)) {
      const sessionId = nanoid(36);

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

      return {
        status: 200,
        headers,
        body: {
          user: {
            name: user.name,
            email: user.email
          },
          message: 'signin successful'
        }
      };
    } else {
      return {
        status: 400,
        body: {
          error: 'Incorrect email or password'
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

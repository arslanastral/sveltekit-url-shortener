import { json as json$1 } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';
import { isValidEmail } from '$lib/utils/isValidEmail';
import * as cookie from 'cookie';
import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST({ request }) {
  const body = await request.json();
  const { name, email, password } = await body;
  const userEmail = email.toString().trim().toLowerCase();

  if (!name) {
    return json$1({
  error: 'Name cannot be empty'
}, {
      status: 400
    });
  }

  if (!userEmail) {
    return json$1({
  error: 'Missing email'
}, {
      status: 400
    });
  }

  if (!password) {
    return json$1({
  error: 'Missing password'
}, {
      status: 400
    });
  }

  if (!isValidEmail(userEmail)) {
    return json$1({
  error: 'Invalid email'
}, {
      status: 400
    });
  }

  try {
    const collection = await useCollection('users');
    const user = await collection.findOne({ email: userEmail });

    if (user) {
      return json$1({
  error: 'Email already in use'
}, {
        status: 409
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const sessionId = nanoid(36);

    await collection.insertOne({
      name: name,
      email: userEmail,
      password: hashedPassword,
      sessionId: sessionId
    });

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
    name: name,
    email: userEmail
  },
  message: 'User created'
}, {
      status: 201,
      headers: headers
    });
  } catch (error) {
    return json$1({
  error: 'Internal server error'
}, {
      status: 500
    });
  }
}

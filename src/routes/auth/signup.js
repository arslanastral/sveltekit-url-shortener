import { connectToDatabase } from '$lib/utils/connectToDatabase.js';
import * as cookie from 'cookie';
import bcryptjs from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function post({ request }) {
  const body = await request.json();
  const { name, email, password } = await body;

  if (!email || !password) {
    return {
      status: 400,
      body: {
        error: 'Missing email or password'
      }
    };
  }

  try {
    const db = await connectToDatabase();
    const collection = await db.collection('users');
    const user = await collection.findOne({ email: email });

    if (user) {
      return {
        status: 409,
        body: {
          error: 'Email already in use'
        }
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const sessionId = nanoid(36);

    await collection.insertOne({
      name: name,
      email: email,
      password: hashedPassword,
      sessionId: sessionId
    });

    const headers = {
      'Set-Cookie': cookie.serialize('sessionId', sessionId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax'
      })
    };

    return {
      status: 201,
      headers,
      body: {
        message: 'User created'
      }
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Internal server error'
      }
    };
  }
}

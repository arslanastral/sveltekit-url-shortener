import * as cookie from 'cookie';
import { connectToDatabase } from '$lib/utils/connectToDatabase.js';

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');

  event.locals.user = cookies;

  if (!cookies.sessionId) {
    event.locals.user.authenticated = false;
  }

  const db = await connectToDatabase();
  const collection = await db.collection('users');

  const userSession = await collection.findOne({ sessionId: cookies.sessionId });

  if (userSession) {
    event.locals.user.authenticated = true;
    event.locals.user.email = userSession.email;
  } else {
    event.locals.user.authenticated = false;
  }

  return await resolve(event);
}

export const getSession = async (event) => {
  return event.locals.user
    ? {
        user: {
          authenticated: true,
          name: event.locals.user.name,
          email: event.locals.user.email
        }
      }
    : {};
};

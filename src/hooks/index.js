import * as cookie from 'cookie';
import { useCollection } from '$lib/utils/useCollection';

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  const sessionId = cookies.sessionId;

  event.locals.user = cookies;

  if (!sessionId) {
    event.locals.user.authenticated = false;
    return await resolve(event);
  }

  const collection = await useCollection('users');

  const userSession = await collection.findOne({ sessionId: { $eq: cookies.sessionId } });

  if (userSession) {
    const created_at = userSession._id.getTimestamp().toString();
    event.locals.user.authenticated = true;
    event.locals.user.name = userSession.name;
    event.locals.user.email = userSession.email;
    event.locals.user.createdAt = created_at;
  } else {
    event.locals.user.authenticated = false;
  }

  return await resolve(event);
}

export function getSession({ locals }) {
  if (!locals.user.authenticated) {
    return {
      user: null
    };
  }
  return {
    user: locals.user && {
      authenticated: locals.user.authenticated,
      name: locals.user.name,
      email: locals.user.email
    }
  };
}

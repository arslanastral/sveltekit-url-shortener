import * as cookie from 'cookie';
import { useCollection } from '$lib/utils/useCollection';
import { formatDate } from '$lib/utils/formatDate';

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  const sessionId = cookies.sessionId;

  event.locals.user = cookies;

  if (!sessionId) {
    event.locals.user.authenticated = false;
    return await resolve(event);
  }

  const collection = await useCollection('users');

  const userSession = await collection.findOne({ sessionId: cookies.sessionId });

  if (userSession) {
    const created_at = userSession._id.getTimestamp().toString();
    const formattedDate = formatDate(created_at);
    event.locals.user.authenticated = true;
    event.locals.user.name = userSession.name;
    event.locals.user.email = userSession.email;
    event.locals.user.joined = formattedDate;
  } else {
    event.locals.user.authenticated = false;
  }

  const response = await resolve(event);
  return response;
}

// export function getSession({ locals }) {
//   if (!locals.user.authenticated) {
//     return {
//       user: null
//     };
//   }
//   return {
//     user: locals.user && {
//       authenticated: locals.user.authenticated,
//       name: locals.user.name,
//       email: locals.user.email,
//       joined: locals.user.createdAt
//     }
//   };
// }

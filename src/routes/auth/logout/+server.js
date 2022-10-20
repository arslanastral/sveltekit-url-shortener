import { json } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';

export async function POST({ locals }) {
  const sessionId = locals.user.sessionId;

  if (!sessionId) {
    return json({
  error: 'Not logged in'
}, {
      status: 400
    });
  }

  try {
    const collection = await useCollection('users');

    const userSession = await collection.findOne({ sessionId: { $eq: sessionId } });

    if (userSession) {
      await collection.updateOne(
        { _id: userSession._id },
        {
          $set: {
            sessionId: null
          }
        }
      );

      return json({
  message: 'Logged out successfully'
}, {
        headers: {
          'set-cookie': 'sessionId=deleted; path=/; Max-Age=0'
        }
      });
    } else {
      return json({
  error: 'No session to end'
}, {
        status: 400
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

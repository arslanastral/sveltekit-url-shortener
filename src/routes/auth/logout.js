import { useCollection } from '$lib/utils/useCollection';

export async function post({ locals }) {
  const sessionId = locals.user.sessionId;

  if (!sessionId) {
    return {
      status: 400,
      body: {
        error: 'Not logged in'
      }
    };
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

      return {
        headers: {
          'set-cookie': 'sessionId=deleted; path=/; Max-Age=0'
        },
        body: {
          message: 'Logged out successfully'
        }
      };
    } else {
      return {
        status: 400,
        body: {
          error: 'No session to end'
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

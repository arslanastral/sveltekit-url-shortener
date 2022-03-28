import { connectToDatabase } from '$lib/utils/connectToDatabase.js';
import { isValidHttpUrl } from '$lib/utils/isValidHttpUrl.js';
import { nanoid } from 'nanoid';

export async function post({ request }) {
  const body = await request.formData();
  const submittedURL = body.get('url');
  const host = request.headers.get('host');

  if (isValidHttpUrl(submittedURL, host)) {
    try {
      const db = await connectToDatabase();
      const collection = await db.collection('urls');

      const shortened = await collection.insertOne({
        long_url: submittedURL,
        short_url: nanoid(4)
      });

      const shortenedResult = await collection.findOne({ _id: shortened.insertedId });

      return {
        body: { short_url: shortenedResult.short_url, long_url: shortenedResult.long_url }
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          body: { error: 'Short Link Already Exists' },
          status: 400
        };
      }

      return {
        body: { error: 'Something Went Wrong' },
        status: 500
      };
    }
  }

  return {
    body: { error: 'invalid url' },
    status: 400
  };
}

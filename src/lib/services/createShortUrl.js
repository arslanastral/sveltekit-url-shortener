import { useCollection } from '$lib/utils/useCollection';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function createShortUrl(submittedURL, submittedPassword) {
  try {
    const collection = await useCollection('urls');

    let hash;
    if (submittedPassword) {
      try {
        hash = await bcrypt.hash(submittedPassword, 10);
      } catch (err) {
        return {
          status: 500,
          body: { error: 'Error Creating Secure Link' }
        };
      }
    }

    let shortened = await collection.insertOne({
      long_url: submittedURL,
      short_url: nanoid(4),
      clicks: 0,
      secured: hash ? true : false,
      ...(submittedPassword && { pass: hash })
    });

    const shortenedResult = await collection.findOne({ _id: shortened.insertedId });

    const created_at = shortenedResult._id.getTimestamp().toString();

    if (submittedPassword) {
      return {
        status: 200,
        body: {
          short_url: shortenedResult.short_url,
          secured: shortenedResult.secured,
          created_at
        }
      };
    }
    return {
      status: 200,
      body: {
        short_url: shortenedResult.short_url,
        long_url: shortenedResult.long_url,
        created_at
      }
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

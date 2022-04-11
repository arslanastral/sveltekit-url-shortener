import { connectToDatabase } from '$lib/utils/connectToDatabase.js';
import { isValidHttpUrl } from '$lib/utils/isValidHttpUrl.js';
import rateLimiter from 'lambda-rate-limiter';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const limiter = rateLimiter({
  interval: 120000
}).check;

export async function post({ clientAddress, request }) {
  const body = await request.formData();
  const submittedURL = body.get('url');
  const submittedPassword = body.get('password');
  const host = request.headers.get('host');
  console.log(submittedURL);
  console.log(submittedPassword);

  try {
    await limiter(10, clientAddress);
  } catch (error) {
    return {
      status: 429,
      body: { error: 'Too many requests' }
    };
  }

  if (isValidHttpUrl(submittedURL, host)) {
    try {
      const db = await connectToDatabase();
      const collection = await db.collection('urls');
      let shortened;
      if (submittedPassword) {
        try {
          const hash = await bcrypt.hash(submittedPassword, 10);

          shortened = await collection.insertOne({
            long_url: submittedURL,
            short_url: nanoid(4),
            clicks: 0,
            secured: true,
            pass: hash
          });
        } catch (err) {
          return {
            status: 500,
            body: { error: 'Error Creating Secure Link' }
          };
        }
      } else {
        shortened = await collection.insertOne({
          long_url: submittedURL,
          short_url: nanoid(4),
          clicks: 0
        });
      }

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

  return {
    body: { error: 'invalid url' },
    status: 400
  };
}

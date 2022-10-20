import { json } from '@sveltejs/kit';
import rateLimiter from 'lambda-rate-limiter';
import { isValidHttpUrl } from '$lib/utils/isValidHttpUrl.js';
import { createShortUrl } from '$lib/services/createShortUrl';

const limiter = rateLimiter({
  interval: 120000
}).check;

export async function POST({ locals, getClientAddress, request }) {
  const body = await request.formData();
  const submittedURL = body.get('url');
  const submittedPassword = body.get('password');
  const host = request.headers.get('host');
  const user = locals.user.email || null;

  try {
    await limiter(10, getClientAddress);
  } catch (error) {
    return json(
      { error: 'Too many requests' },
      {
        status: 429
      }
    );
  }

  if (isValidHttpUrl(submittedURL, host)) {
    const result = await createShortUrl(user, submittedURL, submittedPassword);

    throw new Error(
      '@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)'
    );
    // Suggestion (check for correctness before using):
    // return new Response(result.body, { status: result.status });
    return {
      status: result.status,
      body: result.body
    };
  }

  return json(
    { error: 'invalid url' },
    {
      status: 400
    }
  );
}

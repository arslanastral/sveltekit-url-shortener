import rateLimiter from 'lambda-rate-limiter';
import { isValidHttpUrl } from '$lib/utils/isValidHttpUrl.js';
import { createShortUrl } from '$lib/services/createShortUrl';

const limiter = rateLimiter({
  interval: 120000
}).check;

export async function post({ locals, clientAddress, request }) {
  const body = await request.formData();
  const submittedURL = body.get('url');
  const submittedPassword = body.get('password');
  const host = request.headers.get('host');
  const user = locals.user.email || null;

  try {
    await limiter(10, clientAddress);
  } catch (error) {
    return {
      status: 429,
      body: { error: 'Too many requests' }
    };
  }

  if (isValidHttpUrl(submittedURL, host)) {
    const result = await createShortUrl(user, submittedURL, submittedPassword);

    return {
      status: result.status,
      body: result.body
    };
  }

  return {
    body: { error: 'invalid url' },
    status: 400
  };
}

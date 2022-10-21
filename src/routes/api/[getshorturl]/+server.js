import { useCollection } from '$lib/utils/useCollection';
import { collectAnalytics } from '$lib/services/collectAnalytics';
import { unlockShortUrl } from '$lib/services/unlockShortUrl';

export async function GET({ params, request }) {
  const id = params.getshorturl;
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');

  let location;
  let source;

  if (import.meta.env.VITE_NODE_ENV === 'development') {
    location = 'Saturn';
  } else {
    location = request.headers.get('x-vercel-ip-country');
  }

  if (referer) {
    const refererURL = new URL(referer);

    if (refererURL.host === host) {
      source = null;
    } else {
      source = referer;
    }
  }

  try {
    const collection = await useCollection('urls');

    const link = await collection.findOne({ short_url: id });
    if (link.secured) {
      return new Response(undefined, { status: 301, headers: { Location: `/unlock?id=${id}` } });
    }

    if (!(link.created_by === 'anon')) {
      await collectAnalytics(
        id,
        link.created_by,
        request.headers.get('user-agent'),
        location,
        source
      );
    }

    await collection.updateOne({ short_url: id }, { $inc: { clicks: 1 } });

    return new Response(undefined, { status: 301, headers: { Location: link.long_url } });
  } catch (error) {
    return new Response("This short link doesn't exist", { status: 404 });
  }
}

export async function POST({ request, params }) {
  const body = await request.formData();
  const userAgent = request.headers.get('user-agent');
  const submittedPassword = body.get('password');
  const id = params.getshorturl;

  let location;

  if (import.meta.env.VITE_NODE_ENV === 'development') {
    location = 'Saturn';
  } else {
    location = request.headers.get('x-vercel-ip-country');
  }

  if (!submittedPassword) {
    return new Response('No Password Entered', { status: 400 });
  }

  if (id.length > 4) {
    return new Response('Bad Request', { status: 400 });
  }

  let result = await unlockShortUrl(id, submittedPassword, userAgent, location);

  return new Response(result.body, { status: result.status, headers: result.headers });
}

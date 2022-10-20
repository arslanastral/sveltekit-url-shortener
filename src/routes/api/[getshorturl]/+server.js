import { useCollection } from '$lib/utils/useCollection';
import { collectAnalytics } from '$lib/services/collectAnalytics';
import bcrypt from 'bcryptjs';

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

  try {
    const collection = await useCollection('urls');
    const link = await collection.findOne({ short_url: id });

    if (link.secured) {
      try {
        if (await bcrypt.compare(submittedPassword, link.pass)) {
          if (!(link.created_by === 'anon')) {
            await collectAnalytics(
              id,
              link.created_by,
              request.headers.get('user-agent'),
              location,
              null
            );
          }

          await collection.updateOne({ short_url: id }, { $inc: { clicks: 1 } });
          return new Response(undefined, { status: 301, headers: { Location: link.long_url } });

          // password match
        } else {
          return new Response('Incorrect Password', { status: 400 });
          // password did not match
        }
      } catch (err) {
        return new Response('Something Went Wrong', { status: 500 });
      }
    } else {
      return new Response('This is not a protected link', { status: 400 });
    }
  } catch (error) {
    return new Response('Something Went Wrong', { status: 500 });
  }
}

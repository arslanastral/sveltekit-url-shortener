import { useCollection } from '$lib/utils/useCollection';
import { collectAnalytics } from '$lib/services/collectAnalytics';
import bcrypt from 'bcryptjs';

export async function get({ params, request, clientAddress }) {
  const id = params.getshorturl;

  try {
    const collection = await useCollection('urls');

    const link = await collection.findOne({ short_url: id });
    if (link.secured) {
      return {
        headers: { Location: `/unlock?id=${id}` },
        status: 301
      };
    }

    if (!(link.created_by === 'anon')) {
      await collectAnalytics(
        link.created_by,
        clientAddress,
        id,
        request.headers.get('user-agent'),
        request.headers.get('referer')
      );
    }

    await collection.updateOne({ short_url: id }, { $inc: { clicks: 1 } });
    return {
      headers: { Location: link.long_url },
      status: 301
    };
  } catch (error) {
    return {
      body: "This short link doesn't exist",
      status: 404
    };
  }
}

export async function post({ request, params, clientAddress }) {
  const body = await request.formData();
  const submittedPassword = body.get('password');
  const id = params.getshorturl;

  if (!submittedPassword) {
    return {
      body: 'No Password Entered',
      status: 400
    };
  }

  if (id.length > 4) {
    return {
      body: 'Bad Request',
      status: 400
    };
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
              clientAddress,
              null
            );
          }

          await collection.updateOne({ short_url: id }, { $inc: { clicks: 1 } });
          return {
            headers: { Location: link.long_url },
            status: 301
          };

          // password match
        } else {
          return {
            body: 'Incorrect Password',
            status: 400
          };
          // password did not match
        }
      } catch (err) {
        return {
          body: 'Something Went Wrong',
          status: 500
        };
      }
    } else {
      return {
        body: 'This is not a protected link',
        status: 400
      };
    }
  } catch (error) {
    return {
      body: 'Something Went Wrong',
      status: 500
    };
  }
}

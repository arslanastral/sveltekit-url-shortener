import { useCollection } from '$lib/utils/useCollection';
import { collectAnalytics } from '$lib/services/collectAnalytics';
import bcrypt from 'bcryptjs';

export async function unlockShortUrl(id, submittedPassword, userAgent, location) {
  const collection = await useCollection('urls');
  const link = await collection.findOne({ short_url: id });

  if (link && link.secured) {
    try {
      if (await bcrypt.compare(submittedPassword, link.pass)) {
        if (!(link.created_by === 'anon')) {
          await collectAnalytics(id, link.created_by, userAgent, location, null);
        }

        await collection.updateOne({ short_url: id }, { $inc: { clicks: 1 } });
        return { body: undefined, status: 301, headers: { Location: link.long_url } };

        // password match
      } else {
        return { body: 'Incorrect Password', status: 400 };
        // password did not match
      }
    } catch (err) {
      return { body: 'Something Went Wrong', status: 500 };
    }
  } else {
    return { body: 'This is not a short link', status: 400 };
  }
}

import { connectToDatabase } from '$lib/utils/connectToDatabase.js';

export async function get({ params }) {
  const shorturlID = params.shorturl;

  const db = await connectToDatabase();
  const collection = await db.collection('urls');
  const link = await collection.findOne({ short_url: shorturlID });

  return {
    headers: { Location: link.long_url },
    status: 301
  };
}

import { connectToDatabase } from '$lib/utils/connectToDatabase.js';

export async function get({ params }) {
  const id = params.getshorturl;

  try {
    const db = await connectToDatabase();
    const collection = await db.collection('urls');
    const link = await collection.findOne({ short_url: id });
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

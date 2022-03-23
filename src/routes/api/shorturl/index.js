import { connectToDatabase } from '$lib/utils/connectToDatabase.js';
import { nanoid } from 'nanoid';

export async function get() {
  const db = await connectToDatabase();
  const collection = await db.collection('urls');
  const urls = await collection.find({}).limit(50).toArray();
  return {
    body: { urls }
  };
}

export async function post({ request }) {
  const body = await request.formData();
  const submittedURL = body.get('url');

  const db = await connectToDatabase();
  const collection = await db.collection('urls');

  const shortened = await collection.insertOne({ long_url: submittedURL, short_url: nanoid(4) });
  const shortenedResult = await collection.findOne({ _id: shortened.insertedId });

  let result = { short_url: shortenedResult.short_url, long_url: shortenedResult.long_url };

  return {
    body: result
  };
}

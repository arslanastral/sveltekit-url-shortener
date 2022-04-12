import { connectToDatabase } from '$lib/utils/connectToDatabase.js';

export async function useCollection(collectionName) {
  const db = await connectToDatabase();
  const collection = await db.collection(collectionName);
  return collection;
}

import { useCollection } from '$lib/utils/useCollection';
import { nanoid } from 'nanoid';

export async function insertDemoData() {
  try {
    const collection = await useCollection('urls');

    const demoLinkExists = await collection.findOne({ demo: { $exists: true } });

    if (demoLinkExists) {
      return;
    }

    await collection.insertOne({
      long_url: 'https://www.google.com',
      short_url: nanoid(4),
      clicks: 0,
      secured: false,
      created_by: 'demo@ky.com',
      tags: [],
      demo: new Date()
    });
  } catch (error) {
    console.log(error);
  }
}

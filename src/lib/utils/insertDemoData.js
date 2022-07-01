import { useCollection } from '$lib/utils/useCollection';
import { generateDemoData } from './generateDemoData';
import { nanoid } from 'nanoid';

export async function insertDemoData() {
  try {
    const collection = await useCollection('urls');
    const analyticsCollection = await useCollection('analytics');

    const demoLinkExists = await collection.findOne({ demo: { $exists: true } });

    if (demoLinkExists) {
      return;
    }

    let id = nanoid(4);

    let data = generateDemoData(id);

    await analyticsCollection.insertMany(data);

    await collection.insertOne({
      long_url: 'https://www.google.com',
      short_url: id,
      clicks: data.length,
      secured: false,
      created_by: 'demo@ky.com',
      tags: [],
      demo: new Date()
    });
  } catch (error) {
    console.log(error);
  }
}

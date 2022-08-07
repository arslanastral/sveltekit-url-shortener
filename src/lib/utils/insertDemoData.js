import { useCollection } from '$lib/utils/useCollection';
import { utcDay, utcHour } from 'd3';
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

    await collection.insertOne({
      long_url: 'https://www.google.com',
      short_url: id,
      clicks: data.length,
      secured: false,
      created_by: 'demo@ky.com',
      tags: [],
      demo: new Date()
    });

    let demoLinks = [];

    for (let i = 0; i < 30; i++) {
      demoLinks.push({
        long_url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade',
        short_url: nanoid(4),
        clicks: 1,
        secured: false,
        created_by: 'demo@ky.com',
        tags: [],
        demo: new Date()
      });
    }

    await collection.insertMany(demoLinks);

    await analyticsCollection.insertMany(data);
  } catch (error) {
    console.log(error);
  }
}

function generateDemoData(id) {
  let currentDate = new Date();
  let flooredDate = utcDay.floor(currentDate);
  let lastWeek = utcDay.offset(flooredDate, -7);

  let week = utcDay.range(lastWeek, currentDate, 1);
  let hours = utcHour.range(flooredDate, currentDate, 1);

  let dates = week.concat(hours);

  let randomClicks = dates
    .map((e) => {
      let rand = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
      let duplicates = [];

      for (let i = 0; i < rand; i++) {
        duplicates.push(e);
      }

      return duplicates;
    })
    .flat();

  let data = randomClicks.map((e) => {
    let obj = {
      metadata: { short_url: id, created_by: 'demo@ky.com' },
      info: { browser: 'Chrome', os: 'Windows', device: null },
      location: 'Saturn',
      ref: null,
      timestamp: e,
      clicks: 1
    };
    return obj;
  });

  return data;
}

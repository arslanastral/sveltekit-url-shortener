import { useCollection } from '$lib/utils/useCollection';
import parser from 'ua-parser-js';

export async function collectAnalytics(shortUrl, user, userAgent, location, referer) {
  const analytics = await useCollection('analytics');

  const { browser, os, device } = parser(userAgent);

  await analytics.insertOne({
    metadata: { short_url: shortUrl, created_by: user },
    info: { browser: browser.name, os: os.name, device: device.type },
    location: location,
    ref: referer,
    timestamp: new Date(),
    clicks: 1
  });
}

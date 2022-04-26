import { useCollection } from '$lib/utils/useCollection';

export async function collectAnalytics(shortUrl, user, userAgent, location, referer) {
  const analytics = await useCollection('analytics');

  await analytics.insertOne({
    metadata: { short_url: shortUrl, created_by: user },
    ua: userAgent,
    location: location,
    ref: referer,
    timestamp: new Date(),
    clicks: 1
  });
}

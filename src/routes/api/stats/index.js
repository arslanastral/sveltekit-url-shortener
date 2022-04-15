import { useCollection } from '$lib/utils/useCollection';

export async function get({ locals }) {
  const user = locals.user;

  let shortenedCountQuery;

  if (user.authenticated) {
    shortenedCountQuery = { created_by: user.email };
  } else {
    shortenedCountQuery = { short_url: { $exists: true } };
  }

  try {
    const collection = await useCollection('urls');

    let shortened = await collection.countDocuments(shortenedCountQuery);

    const clicksPipeline = [
      { $match: shortenedCountQuery },
      {
        $group: {
          _id: '',
          clicks: {
            $sum: '$clicks'
          }
        }
      },
      {
        $project: {
          _id: 0,
          clicks: '$clicks'
        }
      }
    ];

    const aggregateClicks = await collection.aggregate(clicksPipeline).toArray();

    let clicks = aggregateClicks[0].clicks;

    const secured = await collection.countDocuments({
      secured: { $eq: true },
      ...(user.authenticated && shortenedCountQuery)
    });

    return {
      headers: {
        'cache-control': 's-maxage=1, stale-while-revalidate=59'
      },
      body: {
        shortened: shortened.toString(),
        clicks: clicks.toString(),
        secured: secured.toString()
      },
      status: 200
    };
  } catch (error) {
    return {
      body: { error: 'Error Getting Stats' },
      status: 500
    };
  }
}

import { useCollection } from '$lib/utils/useCollection';

export async function get() {
  try {
    const collection = await useCollection('urls');

    let shortened = await collection.countDocuments({ short_url: { $exists: true } });

    const clicksPipeline = [
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

    const secured = await collection.countDocuments({ secured: { $eq: true } });

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

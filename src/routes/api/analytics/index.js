import { useCollection } from '$lib/utils/useCollection';

export async function get({ locals, url }) {
  const currentUser = locals.user;
  const time = url.searchParams.get('time');
  const id = url.searchParams.get('id');

  if (!currentUser.authenticated) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  let timeFilter;

  if (time === 'week') {
    timeFilter = new Date(new Date().setDate(new Date().getDate() - 7));
  } else {
    timeFilter = new Date(new Date().setHours(0, 0, 0, 0));
  }

  let timeQuery = { timestamp: { $gte: timeFilter } };
  let linkQuery = { 'metadata.short_url': id };

  try {
    const collection = await useCollection('analytics');

    if (id) {
      let link = await collection.findOne(linkQuery);

      if (!link) {
        return {
          status: 404,
          body: { error: 'Link not found' }
        };
      }
    }

    let analyticsPipeline = [
      {
        $match: {
          'metadata.created_by': currentUser.email,
          ...(id && linkQuery),
          ...(time !== 'all' && timeQuery)
        }
      },

      {
        $facet: {
          clicks: [
            { $group: { _id: '$clicks', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
              $project: {
                _id: 0,
                count: '$count'
              }
            }
          ],
          location: [
            { $group: { _id: '$location', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
              $project: {
                _id: 0,
                count: '$count',
                name: '$_id'
              }
            }
          ],
          browser: [
            { $group: { _id: '$info.browser', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
              $project: {
                _id: 0,
                count: '$count',
                name: '$_id'
              }
            }
          ],
          source: [
            { $group: { _id: '$ref', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
              $project: {
                _id: 0,
                count: '$count',
                name: {
                  $cond: { if: { $eq: ['$_id', null] }, then: 'Direct', else: '$_id' }
                }
              }
            }
          ],
          OS: [
            { $group: { _id: '$info.os', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
              $project: {
                _id: 0,
                count: '$count',
                name: '$_id'
              }
            }
          ],
          device: [
            { $group: { _id: '$info.device', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            {
              $project: {
                _id: 0,
                count: '$count',

                name: {
                  $cond: { if: { $eq: ['$_id', null] }, then: 'Desktop', else: '$_id' }
                }
              }
            }
          ]
        }
      }
    ];

    const links = await collection.aggregate(analyticsPipeline).toArray();

    return {
      status: 200,
      body: links
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: 'Internal Server Error' }
    };
  }
}

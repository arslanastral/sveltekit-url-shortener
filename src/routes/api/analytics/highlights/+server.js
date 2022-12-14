import { json } from '@sveltejs/kit';
import { useCollection } from '$lib/utils/useCollection';
import { countryCodes } from '$lib/utils/countryCodes';

export async function GET({ locals, url }) {
  const currentUser = locals.user;
  const time = url.searchParams.get('time');
  const id = url.searchParams.get('id');
  const isDemoUser = currentUser.email === 'demo@ky.com';

  if (!currentUser.authenticated) {
    return json(
      { error: 'Unauthorized' },
      {
        status: 401
      }
    );
  }

  let timeFilter;

  if (time === 'weekly') {
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
        return json(
          { error: 'Link not found' },
          {
            status: 404
          }
        );
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
                  $cond: [
                    {
                      $eq: ['$_id', null]
                    },
                    'Direct',
                    '$_id'
                  ]
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

    if (!links[0].clicks.length) {
      return json({});
    }

    //TODO REFACTOR

    let location = links[0].location[0].name.toString();
    let countryName;

    if (import.meta.env.VITE_NODE_ENV === 'development' || isDemoUser) {
      countryName = 'Saturn';
    } else {
      countryName = countryCodes.filter((country) => country.code === location)[0].name;
    }

    let source = links[0].source[0].name.toString();
    let sourceName;

    if (source === 'Direct') {
      sourceName = 'Direct';
    } else {
      let host = new URL(source).host;

      if (host.slice(0, 4) === 'www.') {
        sourceName = host.slice(4, host.length);
      } else {
        sourceName = host;
      }
    }

    let highlights = {
      clickCount: links[0].clicks[0].count.toString(),
      topLocation: countryName,
      topSource: sourceName,
      topDevice: links[0].device[0].name.toString(),
      topBrowser: links[0].browser[0].name.toString(),
      topOS: links[0].OS[0].name.toString()
    };

    return json(highlights, {
      status: 200
    });
  } catch (error) {
    return json(
      { error: 'Internal Server Error' },
      {
        status: 500
      }
    );
  }
}

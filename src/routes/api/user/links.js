import { useCollection } from '$lib/utils/useCollection';
import rateLimiter from 'lambda-rate-limiter';

const limiter = rateLimiter({
  interval: 120000
}).check;

export async function GET({ locals, url, clientAddress }) {
  const currentUser = locals.user;
  const page = url.searchParams.get('page') ?? 0;
  const sortBy = url.searchParams.get('sort');
  const tags = url.searchParams.get('tags');
  const tagsArray = tags ? tags.split(',') : [];
  const searchQuery = url.searchParams.get('s');
  const linksPerPage = 10;

  try {
    await limiter(40, clientAddress);
  } catch (error) {
    return {
      status: 429,
      body: { error: 'Too many requests' }
    };
  }

  if (!currentUser.authenticated) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  let sort;
  let filter;

  if (tags) {
    filter = { tags: { $elemMatch: { name: { $in: tagsArray } } } };
  }

  if (searchQuery) {
    filter = {
      $or: [
        { long_url: { $regex: searchQuery, $options: 'i' } },
        { 'tags.name': { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  switch (sortBy) {
    case 'date':
      sort = { _id: 1 };
      break;
    case 'clicks':
      sort = { clicks: 1 };
      break;
    case '-clicks':
      sort = { clicks: -1 };
      break;
    default:
      sort = { _id: -1 };
  }

  try {
    const collection = await useCollection('urls');

    const links = await collection
      .find({ created_by: currentUser.email, ...((tags && filter) || (searchQuery && filter)) })
      .sort(sort)
      .skip(page * linksPerPage)
      .limit(linksPerPage)
      .project({
        created_at: { $toDate: '$_id' },
        _id: 0,
        long_url: 1,
        short_url: 1,
        secured: 1,
        clicks: 1,
        tags: 1
      })
      .toArray();

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

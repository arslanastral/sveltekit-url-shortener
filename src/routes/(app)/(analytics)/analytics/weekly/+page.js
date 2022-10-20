import { parallelFetch } from '$lib/utils/parallelFetch';
import { redirect } from '@sveltejs/kit';

export async function load({ parent, fetch }) {
  const { user } = await parent();
  if (!user.authenticated) {
    throw redirect(302, '/login');
  }

  const highlights = '/api/analytics/highlights?time=weekly';
  const activity = '/api/analytics/activity?time=weekly';

  const data = await parallelFetch(fetch, highlights, activity);

  if (data) {
    const [highlightsdata, activityData] = data;
    if (Object.keys(highlightsdata).length) {
      return {
        highlightsdata,
        activityData
      };
    }
  }
  return {};
}

import { redirect } from '@sveltejs/kit';

export async function load({ parent, fetch }) {
  const { user } = await parent();
  if (!user.authenticated) {
    throw redirect(302, '/login');
  }

  const highlights = await fetch('/api/analytics/highlights?time=weekly');
  const activity = await fetch('/api/analytics/activity?time=weekly');

  if (highlights.ok && activity.ok) {
    const highlightsdata = await highlights.json();
    const activityData = await activity.json();
    if (Object.keys(highlightsdata).length) {
      return {
        highlightsdata,
        activityData
      };
    }
  }
  return {};
}
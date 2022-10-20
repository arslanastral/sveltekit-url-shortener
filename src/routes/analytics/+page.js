import { redirect } from '@sveltejs/kit';

export async function load({ session, fetch }) {
  if (!session.user) {
    throw redirect(302, '/login');
  }

  const highlights = await fetch('/api/analytics/highlights');
  const activity = await fetch('/api/analytics/activity');

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

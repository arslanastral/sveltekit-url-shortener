import { redirect } from '@sveltejs/kit';
import { getStats } from '$lib/utils/getStats';
export async function load({ parent, fetch }) {
  const { user } = await parent();

  if (!user.authenticated) {
    throw redirect(302, '/login');
  }

  const res = await fetch('/api/user/links');
  const { shortened, clicks, secured } = await getStats(fetch);

  if (res.ok) {
    const links = await res.json();
    return {
      links,
      StatsData: { shortened, clicks, secured }
    };
  } else {
    return {
      error: 'Error loading links'
    };
  }
}

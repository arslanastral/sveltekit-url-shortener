import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { UserRecentStore } from '$lib/stores/RecentStore';

export async function load({ fetch, parent }) {
  const { user } = await parent();
  if (!user.authenticated) {
    throw redirect(302, '/');
  }

  await fetch('/auth/logout', {
    method: 'POST'
  });

  if (browser) {
    UserRecentStore.set([]);
    window.location.href = '/';
  }
  return {};
}

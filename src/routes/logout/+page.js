import { redirect } from '@sveltejs/kit';
import { browser } from '$app/env';
import { UserRecentStore } from '$lib/stores/RecentStore';

export async function load({ fetch, session }) {
  if (!session.user) {
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

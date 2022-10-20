import { redirect } from '@sveltejs/kit';

export async function load({ parent, fetch }) {
  const { user } = await parent();
  if (!user.authenticated) {
    throw redirect(302, '/login');
  }

  const res = await fetch('/api/user/links');

  if (res.ok) {
    const links = await res.json();
    return {
      links
    };
  } else {
    return {
      error: 'Error loading links'
    };
  }
}

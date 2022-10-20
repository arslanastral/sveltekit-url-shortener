import { redirect } from '@sveltejs/kit';

export async function load({ session, fetch }) {
  if (!session.user) {
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

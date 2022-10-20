import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
  const id = url.searchParams.get('id');

  if (!id || id.length > 4) {
    throw redirect(302, '/');
  }

  return {
  id
};
}

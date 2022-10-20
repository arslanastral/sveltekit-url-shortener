import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
  const currentUser = locals.user;

  if (!currentUser.authenticated) {
    return json({ error: 'Unauthorized' }, {
      status: 401
    });
  }

  return json({
  name: currentUser.name,
  email: currentUser.email,
  created_at: currentUser.createdAt
});
}

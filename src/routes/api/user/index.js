export async function get({ locals }) {
  const currentUser = locals.user;

  if (!currentUser.authenticated) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  return {
    status: 200,
    body: {
      name: currentUser.name,
      email: currentUser.email,
      created_at: currentUser.createdAt
    }
  };
}

export async function get() {
  return {
    body: { status: 'working' }
  };
}

export async function post({ request }) {
  const body = await request.formData();
  const long_url = body.get('url');

  // let long_url = request.body.get('url');
  return {
    body: { long_url }
  };
}

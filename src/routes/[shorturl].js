export async function get({ params }) {
  return {
    headers: { Location: `/api/${params.shorturl}` },
    status: 307
  };
}

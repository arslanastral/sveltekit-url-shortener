export async function GET({ params }) {
  return {
    headers: { Location: `/api/${params.shorturl}` },
    status: 307
  };
}

export async function GET({ params }) {
  return new Response(undefined, { status: 307, headers: { Location: `/api/${params.shorturl}` } });
}

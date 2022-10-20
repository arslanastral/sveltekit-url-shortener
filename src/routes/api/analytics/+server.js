export async function GET() {
  return new Response(undefined, { status: 301, headers: { Location: '/api/analytics/highlights' } });
}

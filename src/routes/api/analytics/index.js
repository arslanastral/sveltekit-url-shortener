export async function get() {
  return {
    headers: { Location: '/api/analytics/highlights' },
    status: 301
  };
}

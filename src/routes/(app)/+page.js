import { getStats } from '$lib/utils/getStats';
export async function load({ fetch }) {
  const { shortened, clicks, secured } = await getStats(fetch);
  return {
  StatsData: { shortened, clicks, secured }
};
}

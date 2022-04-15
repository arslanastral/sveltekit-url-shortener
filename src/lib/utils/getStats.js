import { formatCount } from './formatCount';

export async function getStats(fetch) {
  const res = await fetch('/api/stats');

  let shortened;
  let clicks;
  let secured;

  if (res.ok) {
    const result = await res.json();
    shortened = formatCount(result.shortened);
    clicks = formatCount(result.clicks);
    secured = formatCount(result.secured);
    return {
      shortened,
      clicks,
      secured
    };
  } else {
    shortened = '0';
    clicks = '0';
    secured = '0';
    return {
      shortened,
      clicks,
      secured
    };
  }
}

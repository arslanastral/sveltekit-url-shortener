import { timeDay, timeHour } from 'd3';

export function generateDemoData(id) {
  let week = timeDay.range(timeDay.offset(new Date(), -7), new Date(), 1);
  let hours = timeHour.range(timeDay.floor(new Date()), new Date(), 1);

  let dates = week.concat(hours);

  let data = dates.map((e) => {
    let obj = {
      metadata: { short_url: id, created_by: 'demo@ky.com' },
      info: { browser: 'Chrome', os: 'Windows', device: null },
      location: 'Saturn',
      ref: null,
      timestamp: e,
      clicks: 1
    };
    return obj;
  });

  return data;
}

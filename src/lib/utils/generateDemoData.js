import { utcDay, utcHour } from 'd3';

export function generateDemoData(id) {
  let currentDate = new Date();
  let flooredDate = utcDay.floor(currentDate);
  let lastWeek = utcDay.offset(flooredDate, -7);

  let week = utcDay.range(lastWeek, flooredDate, 1);
  let hours = utcHour.range(flooredDate, currentDate, 1);

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

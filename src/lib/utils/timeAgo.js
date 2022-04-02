const SHORT_TIME_UNITS = {
  year: 'y',
  month: 'm',
  week: 'w',
  day: 'd',
  hour: 'h',
  minute: 'min',
  second: 's'
};

export function timeAgo(input) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  if (!secondsElapsed) {
    return 'just now';
  }
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      let time = formatter.formatToParts(Math.round(delta), key);
      let newTime = `${time[0].value} ${SHORT_TIME_UNITS[time[0].unit]} ago`;
      return newTime;
    }
  }
}

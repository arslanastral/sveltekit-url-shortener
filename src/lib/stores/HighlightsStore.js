import { writable } from 'svelte/store';

export const CurrentData = writable({
  clickCount: '0',
  clickTitle: 'Today',
  topLocation: 'No Data',
  topSource: 'No Data',
  topDevice: 'No Data'
});

export const TodayData = writable({
  clickCount: '0',
  clickTitle: 'Today',
  topLocation: 'No Data',
  topSource: 'No Data',
  topDevice: 'No Data'
});

export const WeeklyData = writable({
  clickCount: '0',
  clickTitle: 'This Week',
  topLocation: 'No Data',
  topSource: 'No Data',
  topDevice: 'No Data'
});

export const AllData = writable({
  clickCount: '0',
  clickTitle: 'All Time',
  topLocation: 'No Data',
  topSource: 'No Data',
  topDevice: 'No Data'
});

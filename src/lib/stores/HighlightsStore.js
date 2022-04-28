import { writable } from 'svelte/store';

export const Clicks = writable({ clickCount: '0', clickTitle: 'Today' });

export const TopData = writable({
  topLocation: 'No Data',
  topSource: 'No Data',
  topDevice: 'No Data'
});

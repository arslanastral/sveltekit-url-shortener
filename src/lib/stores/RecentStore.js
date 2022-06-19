import { browser } from '$app/env';
import { writable } from 'svelte/store';

export let RecentStore = writable((browser && JSON.parse(localStorage.getItem('history'))) || []);
export let UserRecentStore = writable(
  (browser && JSON.parse(localStorage.getItem('userhistory'))) || []
);

if (browser) {
  RecentStore.subscribe((value) => {
    localStorage.history = JSON.stringify(value);
  });

  UserRecentStore.subscribe((value) => {
    localStorage.history = JSON.stringify(value);
  });
}

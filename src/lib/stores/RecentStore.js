import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const RecentStore = writable((browser && JSON.parse(localStorage.getItem('history'))) || []);
export const UserRecentStore = writable(
  (browser && JSON.parse(localStorage.getItem('userHistory'))) || []
);

if (browser) {
  RecentStore.subscribe((value) => {
    localStorage.history = JSON.stringify(value);
  });

  UserRecentStore.subscribe((value) => {
    localStorage.userHistory = JSON.stringify(value);
  });
}

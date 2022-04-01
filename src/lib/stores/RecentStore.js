import { browser } from '$app/env';
import { writable } from 'svelte/store';

let RecentStore = writable((browser && JSON.parse(localStorage.getItem('history'))) || []);

if (browser) {
  RecentStore.subscribe((value) => {
    localStorage.history = JSON.stringify(value);
  });
}

export default RecentStore;

<script context="module">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import { browser } from '$app/env';
  // import { UserRecentStore } from '$lib/stores/RecentStore';

  // export async function load({ fetch, session }) {
  //   if (!session.user) {
  //     return {
  //       status: 302,
  //       redirect: '/'
  //     };
  //   }

  //   await fetch('/auth/logout', {
  //     method: 'POST'
  //   });

  //   if (browser) {
  //     UserRecentStore.set([]);
  //     window.location.href = '/';
  //   }
  //   return {};
  // }
</script>

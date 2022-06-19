<script context="module">
  import { browser } from '$app/env';
  import { session } from '$app/stores';
  import { UserRecentStore } from '$lib/stores/RecentStore';

  export async function load({ fetch }) {
    await fetch('/auth/logout', {
      method: 'POST'
    });

    if (browser) {
      session.set({ user: null });
      UserRecentStore.set([]);
    }
    return {
      status: 302,
      redirect: '/'
    };
  }
</script>

<script context="module">
  import { browser } from '$app/env';
  import { session } from '$app/stores';

  export async function load({ fetch }) {
    await fetch('/auth/logout', {
      method: 'POST'
    });

    if (browser) session.set({ user: null });

    return {
      status: 302,
      redirect: '/'
    };
  }
</script>

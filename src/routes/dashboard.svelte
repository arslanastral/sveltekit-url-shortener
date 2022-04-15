<script context="module">
  import { getStats } from '$lib/utils/getStats';
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/user/links');
    const { shortened, clicks, secured } = await getStats(fetch);

    if (res.ok) {
      const links = await res.json();
      return {
        props: {
          links,
          stats: { shortened, clicks, secured }
        }
      };
    } else {
      return {
        props: {
          error: 'Error loading links'
        }
      };
    }
  }
</script>

<script>
  import Dashboard from '$lib/components/dashboard/Dashboard.svelte';

  export let links;
  export let error;
  export let stats;
</script>

<div class="wrapper">
  <Dashboard {stats} {links} {error} />
</div>

<style>
  .wrapper {
    background-repeat: repeat;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 90vh;
    /* min-width: 100vw; */
  }
</style>

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
          StatsData: { shortened, clicks, secured }
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
  import Links from '$lib/stores/LinkStore';
  import StatsStore from '$lib/stores/StatsStore';

  export let links;
  export let error;
  export let StatsData;

  $Links = links;
  $StatsStore = StatsData;
</script>

<div class="fadeIn wrapper">
  <Dashboard stats={$StatsStore} links={$Links} {error} />
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
  }
</style>

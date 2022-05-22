<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/analytics?time=all');

    if (res.ok) {
      const data = await res.json();
      if (Object.keys(data).length) {
        return {
          props: {
            data
          }
        };
      }
    }
    return {};
  }
</script>

<script>
  import { AllData } from '$lib/stores/HighlightsStore';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  import UserLinks from '$lib/components/analytics/UserLinks.svelte';
  import Chart from '$lib/components/analytics/Chart.svelte';

  export let data;

  $AllData = data;
</script>

{#if $AllData}
  <Highlights {...$AllData} />
{:else}
  <Highlights />
{/if}

<div class="data-container flex">
  <UserLinks />
  <Chart />
</div>

<style>
  .data-container {
    width: 100%;
    margin-top: 30px;
    gap: 30px;
  }
</style>

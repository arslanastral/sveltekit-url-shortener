<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/analytics/highlights?time=all');
    const activity = await fetch('/api/analytics/activity?time=weekly');

    if (res.ok && activity.ok) {
      const data = await res.json();
      const activityData = await activity.json();
      if (Object.keys(data).length) {
        return {
          props: {
            data,
            activityData
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
  import { Activity } from '$lib/stores/ActivityStore';
  export let data;
  export let activityData;

  $AllData = data;
  $Activity = activityData;
</script>

{#if $AllData}
  <Highlights {...$AllData} clickTitle="All Time" />
{:else}
  <Highlights clickTitle="All Time" />
{/if}

<div class="data-container flex">
  <UserLinks />
  <Chart data={$Activity} />
</div>

<style>
  .data-container {
    width: 100%;
    margin-top: 30px;
    gap: 30px;
  }

  @media only screen and (max-width: 835px) {
    .data-container {
      flex-direction: column;
    }
  }
</style>

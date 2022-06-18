<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const highlights = await fetch('/api/analytics/highlights?time=all');
    const activity = await fetch('/api/analytics/activity?time=weekly');

    if (highlights.ok && activity.ok) {
      const highlightsdata = await highlights.json();
      const activityData = await activity.json();
      if (Object.keys(highlightsdata).length) {
        return {
          props: {
            highlightsdata,
            activityData
          }
        };
      }
    }
    return {};
  }
</script>

<script>
  import { HighlightsData, AllHighlightsData } from '$lib/stores/HighlightsStore';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  import UserLinks from '$lib/components/analytics/UserLinks.svelte';
  import Chart from '$lib/components/analytics/Chart.svelte';
  import { Activity, AllActivity, CurrentSample } from '$lib/stores/ActivityStore';

  $CurrentSample = '';

  export let highlightsdata;
  export let activityData;

  $AllHighlightsData = highlightsdata;
  $HighlightsData = $AllHighlightsData;

  $AllActivity = activityData;
  $Activity = $AllActivity;
</script>

{#if $HighlightsData && Object.keys($HighlightsData).length}
  <Highlights {...$HighlightsData} clickTitle="All Time" />
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

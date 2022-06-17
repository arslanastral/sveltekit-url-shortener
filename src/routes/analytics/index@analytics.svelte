<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const highlights = await fetch('/api/analytics/highlights');
    const activity = await fetch('/api/analytics/activity');

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
  import { Activity, AllActivity } from '$lib/stores/ActivityStore';

  export let highlightsdata;
  export let activityData;

  $AllHighlightsData = highlightsdata;
  $HighlightsData = $AllHighlightsData;

  $AllActivity = activityData;
  $Activity = $AllActivity;
</script>

{#if Object.keys($HighlightsData).length}
  <Highlights {...$HighlightsData} clickTitle="Today" />
{:else}
  <Highlights clickTitle="Today" />
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

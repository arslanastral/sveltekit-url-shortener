<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

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

<script>
  import { HighlightsData, AllHighlightsData } from '$lib/stores/HighlightsStore';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  import UserLinks from '$lib/components/analytics/UserLinks.svelte';
  import Chart from '$lib/components/analytics/Chart.svelte';
  import { Activity, AllActivity, CurrentSample } from '$lib/stores/ActivityStore';

  $CurrentSample = '';

  export let data;

  $AllHighlightsData = data.highlightsdata;
  $HighlightsData = $AllHighlightsData;

  $AllActivity = data.activityData;
  $Activity = $AllActivity;
</script>

{#if $HighlightsData && Object.keys($HighlightsData).length}
  <Highlights {...$HighlightsData} clickTitle="This Week" />
{:else}
  <Highlights clickTitle="This Week" />
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

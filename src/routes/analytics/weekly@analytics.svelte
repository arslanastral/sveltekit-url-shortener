<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/analytics/highlights?time=weekly');
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
  import { WeeklyData } from '$lib/stores/HighlightsStore';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  import UserLinks from '$lib/components/analytics/UserLinks.svelte';
  import Chart from '$lib/components/analytics/Chart.svelte';
  import { Activity } from '$lib/stores/ActivityStore';
  export let data;
  export let activityData;

  $WeeklyData = data;
  $Activity = activityData;
</script>

{#if $WeeklyData}
  <Highlights {...$WeeklyData} clickTitle="This Week" />
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

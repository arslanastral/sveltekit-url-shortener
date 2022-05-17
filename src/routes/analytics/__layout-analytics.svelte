<script context="module">
  export async function load({ session, fetch }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }

    const res = await fetch('/api/user/links');

    if (res.ok) {
      const links = await res.json();
      return {
        props: {
          links
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
  import PageNavigation from '$lib/components/PageNavigation.svelte';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  import { TodayData, WeeklyData, AllData } from '$lib/stores/HighlightsStore';
  import { page } from '$app/stores';
  import UserLinks from '$lib/components/analytics/UserLinks.svelte';
  import Links from '$lib/stores/LinkStore';
  import Chart from '$lib/components/analytics/Chart.svelte';

  export let links;

  $Links = links;

  let pages = [
    {
      name: 'Today',
      path: '/analytics'
    },
    {
      name: 'This Week',
      path: '/analytics/weekly'
    },
    {
      name: 'All Time',
      path: '/analytics/all'
    }
  ];

  let data = {
    '/analytics': $TodayData,
    '/analytics/weekly': $WeeklyData,
    '/analytics/all': $AllData
  };

  let highlightsData = data[$page.url.pathname];
</script>

<div class="fadeIn wrapper">
  <div class="flex container">
    <div class="main-title">Analytics</div>
    <PageNavigation {pages} />
    <div class="analytics-container flex">
      {#if highlightsData}
        <Highlights {...highlightsData} />
      {:else}
        <Highlights />
      {/if}

      <div class="data-container flex">
        <UserLinks />
        <Chart />
      </div>
      <slot />
    </div>
  </div>
</div>

<style>
  .wrapper {
    background-repeat: repeat;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 90vh;
  }

  .container {
    width: 80%;
    margin-top: 20px;
    flex-direction: column;
  }

  .main-title {
    width: 100%;
    font-size: 35px;
    font-weight: bold;
    margin: 10px 0;
  }

  .analytics-container {
    width: 100%;
    margin-top: 30px;
    align-items: flex-start;
    flex-direction: column;
  }

  .data-container {
    width: 100%;
    margin-top: 30px;
    gap: 30px;
  }
</style>

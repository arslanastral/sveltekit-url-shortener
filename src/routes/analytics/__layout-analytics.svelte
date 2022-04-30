<script context="module">
  export async function load({ session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }
    return {};
  }
</script>

<script>
  import PageNavigation from '$lib/components/PageNavigation.svelte';
  import Highlights from '$lib/components/analytics/Highlights.svelte';
  import { TodayData, WeeklyData, AllData } from '$lib/stores/HighlightsStore';
  import { page } from '$app/stores';
  import UserLinks from '$lib/components/analytics/UserLinks.svelte';

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
</script>

<div class="fadeIn wrapper">
  <div class="flex container">
    <div class="main-title">Analytics</div>
    <PageNavigation {pages} />
    <div class="analytics-container flex">
      <Highlights {...data[$page.url.pathname]} />
      <div class="data-container">
        <UserLinks />
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
    overflow: hidden;
    align-items: flex-start;
    flex-direction: column;
  }

  .data-container {
    width: 100%;
    margin-top: 30px;
  }
</style>

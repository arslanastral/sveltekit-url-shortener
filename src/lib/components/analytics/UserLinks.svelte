<script>
  import { page } from '$app/stores';
  import ClicksIcon from '$lib/assets/ClicksIcon.svelte';
  import { CurrentSample, Activity, LinkActivity } from '$lib/stores/ActivityStore';
  import { LinkHighlightsData, HighlightsData } from '$lib/stores/HighlightsStore';
  import Links from '$lib/stores/LinkStore';
  import { parallelFetch } from '$lib/utils/parallelFetch';
  import Link from '../Link.svelte';

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

  let queryStrings = {
    '/analytics': '',
    '/analytics/weekly': '&time=weekly',
    '/analytics/all': '&time=weekly'
  };

  const handleSampleSelect = async (link) => {
    if ($CurrentSample === link) {
      return;
    }
    $CurrentSample = link;

    const activitySample = `/api/analytics/activity?id=${link}${queryStrings[$page.url.pathname]}`;

    const highlightsSample = `/api/analytics/highlights?id=${link}${
      queryStrings[$page.url.pathname]
    }`;

    const data = await parallelFetch(fetch, activitySample, highlightsSample);

    let [activity, highlights] = data;

    if (data && data.length) {
      $LinkActivity = activity;
      $Activity = $LinkActivity;

      $LinkHighlightsData = highlights;
      $HighlightsData = $LinkHighlightsData;
    } else {
      $Activity = [];
      $HighlightsData = {};
    }
  };
</script>

<div class="links-container">
  <div class="header flex"><span>Links</span><span>Total Clicks</span></div>
  {#if $Links.length}
    {#each $Links as link, i}
      <div on:click={() => handleSampleSelect(link.short_url)} class="link-wrapper flex">
        <Link
          secured={link.secured}
          long_url={link.long_url}
          short_url={link.short_url}
          --margin="20px 20px 20px 20px"
          --width="70%"
        />
        <div class="clicks flex">
          <ClicksIcon width="30" height="30" /><span class="click-count">{link.clicks}</span>
        </div>
      </div>
    {/each}
  {:else}
    <div class="flex">
      <div class="no-links">You haven't shortened any links yet.</div>
    </div>
  {/if}
</div>

<style>
  .links-container {
    background: #ffffff;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    height: 550px;
    overflow-y: auto;
    width: clamp(350px, 45vw, 600px);
    min-width: 350px;
    position: relative;
  }

  .header {
    border-radius: 24px 24px 0 0;
    height: 80px;
    width: 100%;
    color: blue;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .header span {
    margin: 20px;
  }

  .link-wrapper {
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    justify-content: space-between;
  }

  .link-wrapper:hover {
    background-color: #e7e7e7;
  }

  .no-links {
    font-size: 20px;
    color: #636363;
    margin: 20px;
  }

  .clicks {
    width: 80px;
    margin: 10px 30px 10px 10px;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 19px;
  }

  .click-count {
    line-height: 22px;
  }

  @media only screen and (max-width: 835px) {
    .links-container {
      width: clamp(350px, 85vw, 900px);
    }
  }
</style>

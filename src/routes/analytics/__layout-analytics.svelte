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
  import '$lib/styles/global.css';
  import 'sanitize.css/sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import PageNavigation from '$lib/components/PageNavigation.svelte';
  import { page } from '$app/stores';
  import { Activity, AllActivity, CurrentSample } from '$lib/stores/ActivityStore';
  import { HighlightsData, AllHighlightsData } from '$lib/stores/HighlightsStore';
  import Links from '$lib/stores/LinkStore';
  import CloseIcon from '$lib/assets/CloseIcon.svelte';

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

  const removeSample = () => {
    if ($AllHighlightsData) {
      $HighlightsData = $AllHighlightsData;
    }

    if ($AllActivity) {
      $Activity = $AllActivity;
    }

    $CurrentSample = '';
  };
</script>

<div class="fadeIn wrapper">
  <div class="flex container">
    <div class="link-header flex">
      <div class="main-title">Analytics</div>
      {#if $CurrentSample}
        <div class="current-sample flex fadeIn">
          <div>{`${$page.url.origin}/${$CurrentSample}`}</div>
          <button class="flex" on:click={removeSample} aria-label="close link sample"
            ><CloseIcon width="22" height="22" /></button
          >
        </div>
      {/if}
    </div>

    <PageNavigation {pages} />
    <div class="analytics-container flex">
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

  .link-header {
    width: 100%;
  }

  .main-title {
    font-size: 35px;
    font-weight: bold;
    margin: 10px 10px 10px 0;
  }

  .current-sample {
    background-color: white;
    border-radius: 20px;
    border: 1px solid black;
    padding: 1px 10px;
  }

  .analytics-container {
    width: 100%;
    margin-top: 30px;
    align-items: flex-start;
    flex-direction: column;
  }

  button {
    margin-left: 6px;
    padding: 0;
    border: none;
    transition: transform ease-out 0.1s;
  }

  button:active {
    transform: scale(0.9);
  }
</style>

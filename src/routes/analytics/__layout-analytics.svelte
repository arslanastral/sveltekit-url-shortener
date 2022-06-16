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
  import Button from '$lib/components/Button.svelte';

  import PageNavigation from '$lib/components/PageNavigation.svelte';
  import Links from '$lib/stores/LinkStore';

  export let links;
  export let id;

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
</script>

<div class="fadeIn wrapper">
  <div class="flex container">
    <div class="link-header flex">
      <div class="main-title">Analytics</div>
      {#if id}
        <div class="current-sample">{`ky.vercel.app/${id}`}</div>
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
    padding: 2px 12px;
  }

  .analytics-container {
    width: 100%;
    margin-top: 30px;
    align-items: flex-start;
    flex-direction: column;
  }
</style>

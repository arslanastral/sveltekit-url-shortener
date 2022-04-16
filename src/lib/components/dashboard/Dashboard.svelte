<script>
  import LinksIcon from '$lib/assets/LinksIcon.svelte';

  import Stats from '../stats/Stats.svelte';
  import DashboardLink from './DashboardLink.svelte';
  export let links;
  export let error;
  export let stats;
</script>

<div class="flex container">
  <div class="main-title">Dashboard</div>
</div>
<div class="flex container">
  <Stats {...stats} />
</div>

<div class="flex container">
  <LinksIcon />
  <div class="title">Your Links</div>
</div>
<div class="grow links-wrapper">
  {#if error}
    <div>{error}</div>
  {/if}

  {#if links.length}
    {#each links as link, i}
      <DashboardLink index={(i + 1).toString()} {...link} />
    {/each}
  {:else}
    <div class="no-links">You haven't shortned any links yet. When you do they will show here.</div>
  {/if}
</div>

<style>
  .container {
    width: 80%;
    margin-top: 20px;
  }

  .main-title {
    font-size: 35px;
    font-weight: bold;
    margin: 10px 0;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    margin: 10px 0;
  }
  .links-wrapper {
    width: 80%;
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    overflow: hidden;
  }

  .no-links {
    font-size: 20px;
    color: #636363;
    margin: 20px;
  }
</style>

<script>
  import DashboardLink from './DashboardLink.svelte';
  export let links;
  export let error;
</script>

<div class="flex title-container">
  <div class="title">Dashboard</div>
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
    <div class="no-links">
      You haven't shortned any links yet. When you do they will appear here.
    </div>
  {/if}
</div>

<style>
  .title-container {
    width: 80%;
  }
  .title {
    font-size: 35px;
    font-weight: bold;
    margin: 10px 0;
  }
  .links-wrapper {
    width: 80%;
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
  }

  .no-links {
    font-size: 20px;
    color: #636363;
    margin: 20px;
  }
</style>

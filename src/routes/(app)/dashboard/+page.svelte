<script>
  import Dashboard from '$lib/components/dashboard/Dashboard.svelte';
  import Links from '$lib/stores/LinkStore';
  import StatsStore from '$lib/stores/StatsStore';

  export let data;

  $Links = data.links;
  $StatsStore = data.StatsData;
  let error = data.error
</script>

<div class="fadeIn wrapper">
  <Dashboard stats={$StatsStore} links={$Links} {error} />
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
</style>

<script>
  import Hero from '$lib/components/Hero.svelte';
  import Shortener from '$lib/components/shortener/Shortener.svelte';
  import Stats from '$lib/components/stats/Stats.svelte';
  import Recent from '$lib/components/recent/Recent.svelte';
  import Backdrop from '$lib/components/Backdrop.svelte';
  import StatsStore from '$lib/stores/StatsStore';
  import { RecentStore, UserRecentStore } from '$lib/stores/RecentStore';
  import { page } from '$app/stores';

  export let data;

  $StatsStore = data.StatsData;
</script>

<div class="content">
  <Hero />
  <Shortener />
  <Stats {...$StatsStore} />
  {#if $page.data.user.authenticated}
    <Recent data={$UserRecentStore} />
  {:else}
    <Recent data={$RecentStore} />
  {/if}

  <Backdrop />
</div>

<style>
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

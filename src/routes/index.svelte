<script context="module">
  import { getStats } from '$lib/utils/getStats';
  export async function load({ fetch }) {
    const { shortened, clicks, secured } = await getStats(fetch);
    return {
      props: {
        shortened,
        clicks,
        secured
      }
    };
  }
</script>

<script>
  import Hero from '$lib/components/Hero.svelte';
  import Shortener from '$lib/components/shortener/Shortener.svelte';
  import Stats from '$lib/components/stats/Stats.svelte';
  import Recent from '$lib/components/recent/Recent.svelte';
  import Backdrop from '$lib/components/Backdrop.svelte';

  export let shortened;
  export let clicks;
  export let secured;
</script>

<div class="content">
  <Hero />
  <Shortener />
  <Stats {shortened} {clicks} {secured} />
  <Recent />
  <Backdrop />
</div>

<style>
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

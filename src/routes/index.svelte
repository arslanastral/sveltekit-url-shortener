<script context="module">
  import { formatCount } from '$lib/utils/formatCount';
  export async function load({ fetch }) {
    const res = await fetch('/api/stats');

    let shortened;
    let clicks;
    let secured;

    if (res.ok) {
      const result = await res.json();
      shortened = formatCount(result.shortened);
      clicks = formatCount(result.clicks);
      secured = formatCount(result.secured);
      return {
        maxage: 86400,
        props: {
          shortened,
          clicks,
          secured
        }
      };
    } else {
      shortened = '0';
      clicks = '0';
      secured = '0';
      return {
        props: {
          shortened,
          clicks,
          secured
        }
      };
    }
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

<script>
  import Hero from '$lib/components/Hero.svelte';
  import Shortener from '$lib/components/shortener/Shortener.svelte';
  import Stats from '$lib/components/stats/Stats.svelte';
  import Recent from '$lib/components/recent/Recent.svelte';
  import Backdrop from '$lib/components/Backdrop.svelte';
</script>

<div class="content">
  <Hero />
  <Shortener />
  <Stats />
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

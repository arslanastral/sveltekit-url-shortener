<script>
  import Hero from '$lib/components/Hero.svelte';
  import Shortener from '$lib/components/Shortener.svelte';
</script>

<div class="content">
  <Hero />
  <Shortener />
</div>

<style>
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

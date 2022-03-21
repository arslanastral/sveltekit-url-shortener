<script>
  import Hero from '$lib/hero.svelte';
  import Input from '$lib/input.svelte';
</script>

<div class="content">
  <Hero />
  <Input />
</div>

<style>
  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>

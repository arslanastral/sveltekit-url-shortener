<script>
  import Hero from '$lib/hero.svelte';
  import Input from '$lib/form.svelte';
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

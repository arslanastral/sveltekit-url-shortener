<script>
  import Hero from '$lib/components/Hero.svelte';
  import Input from '$lib/components/Form.svelte';
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

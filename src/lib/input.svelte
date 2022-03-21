<script>
  import Button from '$lib/button.svelte';
</script>

<div class="input-container">
  <Button
    title="Shortern"
    --font-size="20px"
    --padding="8px 18px"
    --color="white"
    --bg-color="#3E5DFF"
    --border-radius="29px"
  />
</div>

<style>
  .input-container {
    width: 800px;
    height: 60px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 42px;
  }
</style>

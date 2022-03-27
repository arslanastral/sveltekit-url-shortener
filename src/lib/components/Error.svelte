<script>
  import Button from './Button.svelte';
  export let error = '';
</script>

<div class="flex grow">
  <span class="error grow">{error}</span><Button
    title="Retry"
    type="submit"
    --font-size="20px"
    --padding="8px 18px"
    --color="white"
    --bg-color="black"
    --border-radius="29px"
  />
</div>

<style>
  .error {
    font-size: 20px;
    color: red;
    margin-left: 20px;
  }
</style>

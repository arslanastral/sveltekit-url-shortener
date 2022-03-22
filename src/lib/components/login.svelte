<script>
  import Button from '$lib/components/button.svelte';
</script>

<div class="login-container">
  <Button title="Log In" --font-size="18px" --padding="8px 14px" --border="1px solid #000000" />

  <Button
    title="Sign Up"
    --font-size="18px"
    --bg-color="#DFED3E"
    --padding="8px 12px"
    --border="none"
  />
</div>

<style>
  .login-container {
    margin-top: 15px;
  }
</style>

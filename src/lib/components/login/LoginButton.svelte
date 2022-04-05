<script>
  import Button from '$lib/components/Button.svelte';
</script>

<div class="login-container">
  <a href="/signin">
    <Button
      title="Log In"
      --font-size="18px"
      --padding="8px 14px"
      --border="1px solid #dfe1e5"
      --hover-border="1px solid #444"
    />
  </a>

  <a href="/signup">
    <Button
      title="Sign Up"
      --font-size="18px"
      --bg-color="#DFED3E"
      --padding="8px 12px"
      --border="none"
      --active-bg="#eeff2a"
    />
  </a>
</div>

<style>
  .login-container {
    margin: 15px;
  }
</style>

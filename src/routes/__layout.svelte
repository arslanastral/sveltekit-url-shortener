<script>
  import Button from '$lib/button.svelte';
  import Logo from '$lib/logo.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import 'animate.css';
</script>

<header>
  <Logo />
  <div class="login-container">
    <Button title="Log In" --font-size="18px" --padding="10px" --border="1px solid #000000" />

    <Button
      title="Sign Up"
      --font-size="18px"
      --bg-color="#DFED3E"
      --padding="10px"
      --border="none"
    />
  </div>
</header>
<main>
  <slot />
</main>

<style>
</style>

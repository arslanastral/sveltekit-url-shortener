<script>
  import Button from '$lib/button.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import 'animate.css';
</script>

<header>
  <div class="logo-container">
    <div class="logo-circle" />
    <div class="logo-text">ink</div>
  </div>
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
  .logo-circle {
    width: 70px;
    height: 70px;
    background: #dfed3e;
    border-radius: 50%;
    position: relative;
  }

  .logo-text {
    font-size: 45px;
    font-family: 'Merriweather';
    position: absolute;
    left: 16px;
    top: 0px;
  }
</style>

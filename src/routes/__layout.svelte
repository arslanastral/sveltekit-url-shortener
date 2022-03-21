<script>
  import Login from '$lib/login.svelte';
  import Logo from '$lib/logo.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import 'animate.css';
</script>

<header>
  <Logo />
  <Login />
</header>
<main>
  <slot />
</main>

<style>
  :root {
    font-family: 'Inter';
    font-weight: 400;
    letter-spacing: -0.045em;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>

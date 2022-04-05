<script>
  import '$lib/styles/global.css';
  import LoginButton from '$lib/components/login/LoginButton.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
</script>

<header class="flex">
  <Logo />
  <LoginButton />
</header>
<main>
  <slot />
</main>

<style>
  header {
    justify-content: space-evenly;
    height: 10vh;
  }
</style>

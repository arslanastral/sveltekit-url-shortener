<script>
  import '$lib/styles/global.css';
  import Login from '$lib/components/Login.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
</script>

<header class="flex">
  <Logo />
  <Login />
</header>
<main>
  <slot />
</main>

<style>
  header {
    justify-content: space-evenly;
  }
</style>

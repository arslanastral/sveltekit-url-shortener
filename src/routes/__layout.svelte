<script>
  import { session } from '$app/stores';
  import '$lib/styles/global.css';
  import LoginButton from '$lib/components/login/LoginButton.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import UserInfo from '$lib/components/user/UserInfo.svelte';
</script>

<header class="flex">
  <Logo />
  {#if !$session.user}
    <LoginButton />
  {:else}
    <UserInfo name={$session.user.name} />
  {/if}
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

<script>
  import { session } from '$app/stores';
  import '$lib/styles/global.css';
  import LoginButton from '$lib/components/login/LoginButton.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import UserInfo from '$lib/components/user/UserInfo.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
</script>

<header class="flex">
  <Navigation />

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
    max-width: 1560px;
    margin: 0 auto;
    justify-content: space-between;
  }
</style>

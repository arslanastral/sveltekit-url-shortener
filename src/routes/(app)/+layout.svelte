<script>
  import { navigating, page } from '$app/stores';
  import '$lib/styles/global.css';
  import LoginButton from '$lib/components/login/LoginButton.svelte';
  import 'sanitize.css/sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';
  import UserInfo from '$lib/components/user/UserInfo.svelte';
  import Navigation from '$lib/components/Navigation.svelte';
  import LoadingIcon from '$lib/assets/LoadingIcon.svelte';
</script>

<header class="flex">
  <Navigation />

  {#if !$page.data.user.authenticated}
    <LoginButton />
  {:else}
    <UserInfo name={$page.data.user.name} />
  {/if}
</header>
<main>
  {#if $navigating}
    <div class="loading">
      <LoadingIcon />
    </div>
  {:else}
    <slot />
  {/if}
</main>

<style>
  header {
    max-width: 1560px;
    margin: 0 auto;
    justify-content: space-between;
    height: 90px;
  }

  .loading {
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 90px);
  }
</style>

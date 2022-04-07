<script context="module">
  export async function load({ session }) {
    if (!session.user.authenticated) {
      return {
        props: {
          isSignedIn: false
        }
      };
    }

    return {
      props: {
        name: session.user.name,
        email: session.user.email
      }
    };
  }
</script>

<script>
  import '$lib/styles/global.css';
  import LoginButton from '$lib/components/login/LoginButton.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import 'sanitize.css';
  import 'sanitize.css/forms.css';
  import 'sanitize.css/typography.css';

  export let isSignedIn;
  export let email;
  export let name;
</script>

<header class="flex">
  <Logo />
  {#if !isSignedIn}
    <LoginButton />
  {/if}
  <div>Hello {name}</div>
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

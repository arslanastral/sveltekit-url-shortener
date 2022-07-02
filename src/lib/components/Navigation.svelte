<script>
  import { page, session } from '$app/stores';
  import Logo from './Logo.svelte';

  let pages = [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Analytics',
      path: '/analytics'
    },
    {
      name: 'Settings',
      path: '/settings'
    }
  ];

  $: path = $page.url.pathname;
</script>

<nav class="flex">
  <Logo />
  {#if $session.user}
    {#each pages as page}
      <a sveltekit:prefetch class="link" class:selected={path.includes(page.path)} href={page.path}
        >{page.name}</a
      >
    {/each}
  {/if}
</nav>

<style>
  nav {
    font-size: 18px;
  }

  nav a {
    text-decoration: none;
    color: black;
    margin: 20px 8px;
    padding: 8px 20px;
    border-radius: 25px;
  }

  nav a:hover {
    background-color: #f7f7f7;
  }

  .selected {
    color: blue;
    background-color: #f7f7f7;
  }

  @media only screen and (max-width: 750px) {
    nav a {
      display: none;
    }
  }
</style>

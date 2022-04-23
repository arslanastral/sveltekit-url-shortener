<script>
  import { page } from '$app/stores';

  let pages = [
    {
      name: 'My Details',
      path: '/settings'
    },
    {
      name: 'Profile',
      path: '/settings/profile'
    },
    {
      name: 'Account',
      path: '/settings/account'
    }
  ];

  $: path = $page.url.pathname;
</script>

<div class="s-nav flex">
  {#each pages as link}
    <a href={link.path} class:selected={path === link.path}>{link.name}</a>
  {/each}
</div>

<style>
  .s-nav {
    width: 100%;
    gap: 20px;
  }

  a {
    text-decoration: none;
    color: rgb(39, 39, 39);
    font-size: 18px;
    padding: 3px 10px;
    border-radius: 20px;
    transition: 0.1s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color;
  }

  a:hover {
    color: beige;
    background-color: black;
  }

  .selected {
    color: beige;
    background-color: black;
  }
</style>

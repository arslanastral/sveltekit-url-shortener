<script>
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
    },
    {
      name: 'Logout 👋',
      path: '/logout'
    }
  ];
</script>

<div class="fadeIn flex dropdown">
  {#each pages as link}
    <a href={link.path}>{link.name}</a>
  {/each}
</div>

<style>
  .dropdown {
    flex-direction: column;
    align-items: flex-start;
    top: 40px;
    right: 0px;
    position: absolute;
    width: 136px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: #fff;
  }

  a {
    margin: 5px 10px;
    border-radius: 20px;
    text-decoration: none;
    padding: 3px 10px;
    font-size: 16px;

    color: #000000;
    transition: 0.1s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color;
  }

  a:first-child {
    margin-top: 10px;
  }

  a:last-child {
    margin-bottom: 10px;
  }

  a:hover {
    background-color: black;
    color: white;
  }
</style>

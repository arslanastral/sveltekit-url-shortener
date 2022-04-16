<script>
  let pages = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      class: 'page-link'
    },
    {
      name: 'Analytics',
      path: '/analytics',
      class: 'page-link'
    },
    {
      name: 'Settings',
      path: '/settings'
      // class: 'page-link'
    },
    {
      name: 'Logout 👋',
      path: '/logout'
      // class: 'logout-link'
    }
  ];
</script>

<div class="fadeIn flex dropdown">
  {#each pages as link}
    <a class={link.class} href={link.path}>{link.name}</a>
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

  .page-link {
    display: none;
  }

  @media only screen and (max-width: 750px) {
    .page-link {
      display: inline;
    }
  }
</style>

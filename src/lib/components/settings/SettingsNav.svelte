<script>
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
</script>

<div class="s-nav flex">
  {#each pages as link}
    <a href={link.path}>{link.name}</a>
  {/each}
</div>

<style>
  .s-nav {
    width: 100%;
    gap: 20px;
    /* border-bottom: 1px solid #eff0f5; */
  }

  a {
    text-decoration: none;
    color: rgb(39, 39, 39);
    font-size: 18px;
    /* font-weight: 500; */
    /* margin-bottom: 10px; */
    padding: 3px 10px;
  }

  a:hover {
    color: beige;
    background-color: black;
    border-radius: 20px;
  }
</style>

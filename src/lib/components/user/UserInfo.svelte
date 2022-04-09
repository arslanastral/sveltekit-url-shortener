<script>
  import DownIcon from '$lib/assets/DownIcon.svelte';
  import { clickOutside } from '$lib/utils/clickOutside';

  export let name;

  let pages = [
    {
      name: 'Dashboard',
      icon: DownIcon,
      path: '/dashboard'
    },
    {
      name: 'Analytics',
      icon: DownIcon,
      path: '/analytics'
    },
    {
      name: 'Settings',
      icon: DownIcon,
      path: '/settings'
    },
    {
      name: 'Logout 👋',
      icon: DownIcon,
      path: '/logout'
    }
  ];

  let isToggled = false;

  const toggle = () => {
    console.log('runnign');
    isToggled = !isToggled;
  };
</script>

<div class="userinfo flex">
  <div class="user-name">Hey, {name}</div>
  <button use:clickOutside on:click_outside={() => (isToggled = false)} on:click={toggle}
    ><DownIcon /></button
  >

  {#if isToggled}
    <div class="fadeIn flex dropdown">
      {#each pages as link}
        <a href={link.path}>{link.name}</a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .userinfo {
    position: relative;
  }

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

  .user-name {
    font-size: 20px;
    letter-spacing: -0.045em;
  }

  button {
    margin-left: 10px;
    padding: 0;
    border: none;
    transition: transform ease-out 0.1s;
  }

  button:active {
    transform: scale(0.9);
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

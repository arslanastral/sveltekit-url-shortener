<script>
  import DownIcon from '$lib/assets/DownIcon.svelte';

  import { clickOutside } from '$lib/utils/clickOutside';
  import UserMenu from './UserMenu.svelte';

  export let name;

  let isUserMenuToggled = false;

  const toggleUserMenu = () => {
    isUserMenuToggled = !isUserMenuToggled;
  };
</script>

<div class="userinfo flex">
  <div class="user-name">Hey, {name}</div>
  <button
    use:clickOutside
    on:click_outside={() => (isUserMenuToggled = false)}
    on:click={toggleUserMenu}><DownIcon /></button
  >

  {#if isUserMenuToggled}
    <UserMenu />
  {/if}
</div>

<style>
  .userinfo {
    position: relative;
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
</style>

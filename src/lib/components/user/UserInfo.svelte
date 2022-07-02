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

<div
  use:clickOutside
  on:click_outside={() => (isUserMenuToggled = false)}
  on:click={toggleUserMenu}
  class="userinfo flex"
>
  <div class="user-name">Hey, {name}</div>
  <DownIcon />

  {#if isUserMenuToggled}
    <UserMenu />
  {/if}
</div>

<style>
  .userinfo {
    position: relative;
    margin: 20px;
    padding: 8px 20px;
    border-radius: 25px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }

  .user-name {
    font-size: 20px;
    letter-spacing: -0.045em;
    margin-right: 10px;
  }
</style>

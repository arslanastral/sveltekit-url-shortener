<script>
  import SortOption from './SortOption.svelte';
  import { clickOutside } from '$lib/utils/clickOutside';
  export let sort;
  export let setSort;
  export let isToggled = false;

  const toggle = () => {
    isToggled = !isToggled;
  };
</script>

<div class="container">
  <button on:click={toggle} class="control-button">Sort By</button>

  {#if isToggled}
    <div use:clickOutside on:click_outside={() => (isToggled = false)} class="flex menu fadeIn">
      <SortOption title="Date" sortValue="date" {sort} {setSort} {toggle} />
      <SortOption title="Clicks" sortValue="clicks" {sort} {setSort} {toggle} />
    </div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .control-button {
    border: none;
    color: black;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 8px 15px;
    cursor: pointer;
    position: relative;
  }

  .menu {
    gap: 10px;
    position: absolute;
    min-width: 150px;
    top: 50px;
    right: 0px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    z-index: 3;
  }
</style>

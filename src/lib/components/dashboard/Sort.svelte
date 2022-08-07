<script>
  import SortOption from './SortOption.svelte';
  export let sort;
  export let setSort;
  export let isToggled = false;
</script>

<div class="container">
  <button on:click={() => (isToggled = !isToggled)} class="control-button">Sort By</button>

  {#if isToggled}
    <div class="flex menu">
      <SortOption title="Date" sortValue="date" {sort} {setSort} />
      <SortOption title="Clicks" sortValue="clicks" {sort} {setSort} />
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
    border: 1px solid grey;
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
    border: 1px solid blue;
    /* box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28); */
    border-radius: 10px;
    padding: 10px;
  }
</style>

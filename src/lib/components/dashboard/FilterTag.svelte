<script>
  import { TagFilter } from '$lib/stores/FilterStore';
  import CloseIcon from '$lib/assets/CloseIcon.svelte';
  export let name = '';
  export let setTags;
  export let toggle;

  const deleteFilterTag = () => {
    let newFilter = $TagFilter.filter((t) => t !== name);
    $TagFilter = newFilter;
    setTags();
    toggle();
  };
</script>

<div class="flex tag fadeIn">
  <span class="tag-name">{name}</span>
  <button on:click={deleteFilterTag} class="flex"><CloseIcon width="18" height="18" /></button>
</div>

<style>
  .tag {
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    background-color: rgb(238, 238, 238);
    color: black;
    padding: 2px 15px;
    justify-content: space-evenly;
    transition: background-color ease-in-out 0.2s;
  }

  .tag-name {
    max-width: 80px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button {
    margin-left: 6px;
    padding: 0;
    border: 0;
    cursor: pointer;
  }
</style>

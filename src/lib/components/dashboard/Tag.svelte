<script>
  import CloseIcon from '$lib/assets/CloseIcon.svelte';
  import { TagFilter } from '$lib/stores/FilterStore';
  export let tag;
  export let color;
  export let editable = false;
  export let deleteTag;
  export let editTag;
  export let oldTag;
  export let setTags;

  const setFilter = () => {
    if ($TagFilter.find((t) => t === tag)) {
      return;
    }
    $TagFilter.push(tag);
    setTags();
  };
</script>

<div class:dropshadow={oldTag === tag} class="flex tag fadeIn">
  {#if editable}
    <span on:click|self={() => editTag(tag, color)} class="tag-name">{tag}</span>
    <button class="flex" on:click={() => deleteTag(tag)}
      ><CloseIcon width="18" height="18" /></button
    >
  {:else}
    <span on:click={setFilter} class="tag-name">{tag}</span>
  {/if}
</div>

<style>
  .tag {
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    background-color: var(--bg-color);
    color: var(--color);
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
    cursor: pointer;
  }

  .dropshadow {
    /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); */
    border: 1px solid black;
  }

  button {
    margin-left: 6px;
    padding: 0;
    border: 0;
  }
</style>

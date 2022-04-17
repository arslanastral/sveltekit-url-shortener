<script>
  import CloseIcon from '$lib/assets/CloseIcon.svelte';
  export let tag;
  export let editable = false;
  export let deleteTag;
</script>

<div class="flex tag">
  {tag}

  {#if editable}
    <button class="flex" on:click={() => deleteTag(tag)}
      ><CloseIcon width="18" height="18" /></button
    >
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
  }

  button {
    margin-left: 6px;
    padding: 0;
    border: 0;
  }
</style>

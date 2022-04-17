<script>
  import CheckIcon from '$lib/assets/CheckIcon.svelte';

  export let selected = false;
  export let color;
  export let selectColor;
</script>

<button on:click={() => selectColor(color)} class="flex">
  {#if selected}
    <CheckIcon />
  {/if}
</button>

<style>
  button {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    margin: 5px;
    border: none;
    background-color: var(--bg-color);
  }
</style>

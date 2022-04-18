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
    transition: transform ease-out 0.1s, border ease-in 0.1s;
  }

  button:active {
    transform: scale(0.8);
  }
</style>

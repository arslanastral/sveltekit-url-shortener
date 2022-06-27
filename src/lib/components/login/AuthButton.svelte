<script>
  import ButtonLoader from '$lib/assets/ButtonLoader.svelte';

  export let name;
  export let isProcessing = false;
  export let onClick = undefined;
</script>

<button on:click={onClick} class="auth-button flex">
  {#if isProcessing}
    <ButtonLoader width="100%" height="100%" />
  {:else}
    <span class="fadeIn">{name}</span>
  {/if}</button
>

<style>
  .auth-button {
    font-size: 18px;
    width: var(--width);
    margin-top: 20px;
    justify-content: center;
    border: none;
    background-color: var(--bg);
    color: white;
    height: 40px;
    border-radius: 6px;
    transition: transform ease-out 0.09s;
    cursor: pointer;
  }

  .auth-button:active {
    transform: scale(0.97);
  }
</style>

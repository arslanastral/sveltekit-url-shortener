<script>
  import CloseIcon from '$lib/assets/CloseIcon.svelte';

  import { clickOutside } from '$lib/utils/clickOutside';
  export let toggleEditClose;
  export let short_url;
</script>

<div class="fadeIn flex overlay">
  <div use:clickOutside on:click_outside={toggleEditClose} class="edit-container flex center">
    <button
      on:click={toggleEditClose}
      type="button"
      class="flex center close"
      aria-label="close-edit"><CloseIcon width="30" height="30" /></button
    >
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(23, 24, 24, 0.97);
    justify-content: center;
  }

  .edit-container {
    animation: fadeIn 0.5s;
    position: absolute;
    text-align: center;
    width: clamp(430px, 70vw, 800px);
    height: 400px;
    border-radius: 9px;
    background-color: white;
    color: black;
    flex-direction: column;
  }

  .center {
    justify-content: space-evenly;
  }

  .close {
    /* font-weight: bold; */
    position: absolute;
    top: 5px;
    right: 2px;
    /* background-color: black;
    color: white;
    padding: 10px;
    border-radius: 50%; */
    border: none;
    padding: none;
    /* width: 30px;
    height: 30px;
    text-align: center; */
    cursor: pointer;
  }
</style>

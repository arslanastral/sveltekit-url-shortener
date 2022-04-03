<script>
  import { generateQRCode } from '$lib/utils/generateQRCode';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { onMount } from 'svelte';

  export let toggleClose;
  export let shortenedURL;
  let qr;
  let container;

  onMount(async () => {
    if (!qr) {
      qr = await generateQRCode(shortenedURL);
      container.appendChild(qr);
    }
  });
</script>

<div class="fadeIn flex overlay">
  <div
    use:clickOutside
    on:click_outside={toggleClose}
    class="qrcontainer flex center"
    bind:this={container}
  >
    <button on:click={toggleClose} type="button" class="flex center close">X</button>
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

  .qrcontainer {
    animation: fadeIn 0.5s;
    position: absolute;
    text-align: center;
    width: 250px;
    height: 250px;
    border: 2px solid blue;
    border-radius: 9px;
    background-color: white;
    color: black;
  }

  .center {
    justify-content: center;
  }

  .close {
    font-weight: bold;
    position: absolute;
    top: -15px;
    right: -15px;
    background-color: blue;
    color: white;
    padding: 10px;
    border-radius: 50%;
    border: none;
    width: 30px;
    height: 30px;
    text-align: center;
  }
</style>

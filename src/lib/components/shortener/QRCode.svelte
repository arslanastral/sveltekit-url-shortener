<script>
  import { generateQRCode } from '$lib/utils/generateQRCode';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { onMount } from 'svelte';

  export let toggleQRClose;
  export let short_url;
  let qr;
  let container;

  onMount(async () => {
    if (!qr) {
      qr = await generateQRCode(short_url, container);
    }
  });
</script>

<div class="fadeIn flex overlay">
  <div
    use:clickOutside
    on:click_outside={toggleQRClose}
    class="qrcontainer flex center"
    bind:this={container}
  >
    <button
      on:click={toggleQRClose}
      type="button"
      class="flex center close"
      aria-label="close-QR-code">X</button
    >
    <div class="link-text">{short_url}</div>
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
    width: 300px;
    height: 300px;
    border: 2px solid blue;
    border-radius: 9px;
    background-color: white;
    color: black;
    flex-direction: column;
  }

  .link-text {
    font-size: 18px;
    font-weight: 400;
  }

  .center {
    justify-content: space-evenly;
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
    cursor: pointer;
  }
</style>

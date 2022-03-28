<script>
  import { onMount } from 'svelte';

  export let toggleClose;
  export let shortenedURL;
  let qr;
  let container;

  onMount(async () => {
    const kjua = await import('kjua');
    const qrGenerator = kjua.default;

    console.log('triggering');
    if (!qr) {
      qr = qrGenerator({
        text: shortenedURL,
        fill: 'blue',
        rounded: 100,
        size: 200
      });
      container.appendChild(qr);
    }
  });
</script>

<div class="qrcontainer center" bind:this={container}>
  <button on:click={toggleClose} type="button" class="close center">X</button>
</div>

<style>
  .qrcontainer {
    animation: fadeIn 0.5s;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 250px;
    height: 250px;
    border: 2px solid blue;
    border-radius: 9px;
    background-color: white;
    color: black;
  }

  .center {
    display: flex;
    align-items: center;
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

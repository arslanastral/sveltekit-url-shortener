<script>
  import CopyIcon from '$lib/assets/CopyIcon.svelte';
  import { clickToCopy } from '$lib/utils/clickToCopy';
  import QrIcon from '$lib/assets/QRIcon.svelte';
  export let shortLink;
  export let toggleOpen;
</script>

<button on:click={toggleOpen} class="qr-button"><QrIcon fill="#B8B2BF" /></button>
<button on:click={(e) => clickToCopy(e, shortLink)} class="copy-button"
  ><CopyIcon fill="#B8B2BF" /></button
>

<style>
  button {
    height: 100%;
    border: 0;
    transition: 0.1s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color;
  }

  .qr-button {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .copy-button {
    border-left: 1px solid #dfe1e5;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  button:hover {
    background-color: rgb(245, 245, 245);
  }

  button:active {
    background-color: rgb(238, 238, 238);
  }
</style>

<script>
  import QRIcon from '$lib/assets/QRIcon.svelte';
  import QrCode from './QRCode.svelte';

  export let short_url;

  export let qrToggle = false;

  const toggleQR = () => {
    qrToggle = true;
  };

  const toggleQRClose = () => {
    qrToggle = false;
  };
</script>

<button on:click={toggleQR} type="button" class="flex"><QRIcon /><span>{'QR'}</span></button>

{#if qrToggle}
  <QrCode {short_url} {toggleQRClose} />
{/if}

<style>
  button {
    font-size: 20px;
    padding: 8px 18px;
    color: black;
    background-color: white;
    border-radius: 29px;
    border: 1px solid #dfe1e5;
    margin: 6px;
    cursor: pointer;
    transition: border ease-in 0.1s;
  }

  button:hover {
    border: 1px solid #808080;
  }

  button:active {
    background-color: rgb(247, 247, 247);
  }

  span {
    margin-left: 3px;
  }
</style>

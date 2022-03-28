<script>
  import QRIcon from '$lib/assets/QRIcon.svelte';
  import QrCode from './QRCode.svelte';

  export let shortenedURL;

  let toggle = false;

  const toggleOpen = () => {
    toggle = true;
  };

  const toggleClose = () => {
    toggle = false;
  };
</script>

<button on:click={toggleOpen} type="button" class="flex"><QRIcon /><span>{'QR'}</span></button>

{#if toggle}
  <QrCode {shortenedURL} {toggleClose} />
{/if}

<style>
  button {
    font-size: 20px;
    padding: 8px 18px;
    color: black;
    background-color: white;
    border-radius: 29px;
    border: 1px solid #808080;
    margin: 6px;
    cursor: pointer;
    transition: transform ease-in 0.1s;
  }

  button:active {
    transform: scale(0.9);
  }

  span {
    margin-left: 3px;
  }
</style>

<script>
  import CopyIcon from '$lib/assets/CopyIcon.svelte';
  import SuccessIcon from '$lib/assets/SuccessIcon.svelte';
  import { clickToCopy } from '$lib/utils/clickToCopy';
  import QrIcon from '$lib/assets/QRIcon.svelte';
  import EditIcon from '$lib/assets/EditIcon.svelte';
  import { session } from '$app/stores';

  export let shortLink;
  export let toggleOpen;

  let copied = false;

  const copySuccess = () => {
    copied = true;

    setTimeout(() => {
      copied = false;
    }, 1500);
  };
</script>

{#if $session.user}
  <button class="edit-button" aria-label="edit"><EditIcon fill="#B8B2BF" /></button>
{/if}

<button on:click={toggleOpen} class="qr-button" aria-label="QR-code"
  ><QrIcon fill="#B8B2BF" /></button
>
<button
  on:click={(e) => clickToCopy(e, shortLink)}
  on:copysuccess={copySuccess}
  class="copy-button"
  aria-label="copy"
>
  {#if copied}
    <SuccessIcon />
  {:else}
    <CopyIcon fill="#B8B2BF" />
  {/if}
</button>

<style>
  button {
    height: 100%;
    border: 0;
    transition: 0.1s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color;
    cursor: pointer;
  }

  .edit-button {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 1px solid #dfe1e5;
  }

  .qr-button {
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

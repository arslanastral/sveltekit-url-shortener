<script>
  import CopyIcon from '$lib/assets/CopyIcon.svelte';
  import SuccessIcon from '$lib/assets/SuccessIcon.svelte';
  import { clickToCopy } from '$lib/utils/clickToCopy';
  import QrIcon from '$lib/assets/QRIcon.svelte';
  import EditIcon from '$lib/assets/EditIcon.svelte';

  export let short_url;
  export let toggleQR;
  export let toggleEdit;
  export let canEdit = false;

  let copied = false;

  const copySuccess = () => {
    copied = true;

    setTimeout(() => {
      copied = false;
    }, 1500);
  };
</script>

<div class="button-container">
  {#if canEdit}
    <button on:click={toggleEdit} class="edit-button" aria-label="edit"
      ><EditIcon fill="#B8B2BF" /></button
    >{/if}<button on:click={toggleQR} class="qr-button" aria-label="QR-code"
    ><QrIcon fill="#B8B2BF" /></button
  ><button
    on:click={(e) => clickToCopy(e, short_url)}
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
</div>

<style>
  .button-container {
    margin-right: 20px;
    border-radius: 5px;
    border: 1px solid #dfe1e5;
    overflow: hidden;
    height: 37px;
  }

  button {
    height: 100%;
    border: 0;
    transition: 0.1s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color;
    cursor: pointer;
  }

  div > button:first-child {
    border-right: 1px solid #dfe1e5;
  }

  div > button:last-child {
    border-left: 1px solid #dfe1e5;
  }

  button:hover {
    background-color: rgb(245, 245, 245);
  }

  button:active {
    background-color: rgb(238, 238, 238);
  }
</style>

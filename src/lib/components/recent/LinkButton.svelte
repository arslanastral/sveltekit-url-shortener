<script>
  import CopyIcon from '$lib/assets/CopyIcon.svelte';
  import QrIcon from '$lib/assets/QRIcon.svelte';
</script>

<div class="flex">
  <button class="qr-button"><QrIcon /></button>
  <span class="button-seperator" />
  <button class="copy-button"><CopyIcon /></button>
</div>

<style>
  div {
    background: #ffffff;
    border: 1px solid #dfe1e5;
    border-radius: 5px;
    padding: 8px 18px;
    justify-content: space-evenly;
  }

  .button-seperator {
    height: 100%;
    width: 1px;
    background-color: #dfe1e5;
  }
</style>

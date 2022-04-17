<script>
  import LockIcon from '$lib/assets/LockIcon.svelte';
  import QrCode from '$lib/components/shortener/QRCode.svelte';
  import LinkButton from './LinkButton.svelte';
  export let date = '';
  export let long_url = '';
  export let short_url = '';
  export let isSecure = false;

  export let qrToggle = false;

  const toggleQR = () => {
    qrToggle = true;
  };

  const toggleQRClose = () => {
    qrToggle = false;
  };
</script>

<div class="linkbox flex grow">
  {#if date}
    <div class="flex link-date">{date}</div>
  {:else}
    <div class="flex link-date">just now</div>
  {/if}

  <div class="flex link grow-2">
    {#if isSecure}
      <span class="long-link blur">ky://thislinkissecured/</span>
    {:else}
      <span class="long-link">{long_url}</span>
    {/if}

    <div class="flex">
      <a rel="external" class="short-link" href={short_url} target="_blank">{short_url}</a>
      {#if isSecure}
        <LockIcon width="18" height="18" fill="green" />
      {/if}
    </div>
  </div>
  <div class="flex"><LinkButton {short_url} {toggleQR} /></div>
</div>

{#if qrToggle}
  <QrCode {short_url} {toggleQRClose} />
{/if}

<style>
  .linkbox {
    width: 100%;
    height: 75px;
    color: black;
    justify-content: space-between;
    border-bottom: 1px solid #dfe1e5;
  }

  .link-date {
    width: 100px;
    font-size: 14px;
    color: #9c9c9c;
    justify-content: center;
  }

  .link {
    flex-direction: column;
    align-items: flex-start;
  }

  .blur {
    filter: blur(4px);
  }

  .long-link {
    color: #636363;
    display: inline-block;
    width: clamp(200px, 30vw, 400px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .short-link {
    margin-right: 6px;
    color: black;
    text-decoration: none;
  }

  .short-link:hover {
    text-decoration: underline;
  }
</style>

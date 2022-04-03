<script>
  import LockIcon from '$lib/assets/LockIcon.svelte';
  import QrCode from '$lib/components/shortener/QRCode.svelte';
  import LinkButton from './LinkButton.svelte';
  export let time = '';
  export let longLink = '';
  export let shortLink = '';
  export let isSecure = false;

  let toggle = false;

  const toggleOpen = () => {
    toggle = true;
  };

  const toggleClose = () => {
    toggle = false;
  };
</script>

<div class="linkbox flex grow">
  {#if time}
    <div class="flex link-time">{time}</div>
  {:else}
    <div class="flex link-time">just now</div>
  {/if}

  <div class="flex link grow-2">
    {#if isSecure}
      <span class="long-link blur">ky://thislinkissecured/</span>
    {:else}
      <span class="long-link">{longLink}</span>
    {/if}

    <div class="flex">
      <a class="short-link" href={shortLink} target="_blank" rel="noopener noreferrer"
        >{shortLink}</a
      >
      {#if isSecure}
        <LockIcon width="18" height="18" fill="green" />
      {/if}
    </div>
  </div>
  <div class="flex button-container"><LinkButton {shortLink} {toggleOpen} /></div>
</div>

{#if toggle}
  <QrCode shortenedURL={shortLink} {toggleClose} />
{/if}

<style>
  .linkbox {
    width: 100%;
    height: 75px;
    color: black;
    justify-content: space-between;
    border-bottom: 1px solid #dfe1e5;
  }

  .link-time {
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

  .button-container {
    margin-right: 20px;
    height: 48%;
    border-radius: 5px;
    border: 1px solid #dfe1e5;
  }
</style>

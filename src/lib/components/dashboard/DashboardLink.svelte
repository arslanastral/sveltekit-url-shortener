<script>
  import { browser } from '$app/env';
  import LockIcon from '$lib/assets/LockIcon.svelte';
  import { timeAgo } from '$lib/utils/timeAgo';
  import LinkButton from '../recent/LinkButton.svelte';
  import QrCode from '$lib/components/shortener/QRCode.svelte';

  export let index;
  export let short_url;
  export let long_url;
  export let date;
  export let clicks;
  export let secured;
  let shortLink = '';
  if (browser) {
    shortLink = `${window.location.origin}/${short_url}`;
  }

  let toggle = false;

  const toggleOpen = () => {
    toggle = true;
  };

  const toggleClose = () => {
    toggle = false;
  };
</script>

<div class="flex link-container">
  <span class="index">{index}</span>
  <div class="link">
    <div class="long-link">
      <img src={`https://www.google.com/s2/favicons?domain=${long_url}`} alt="favicon" />{long_url}
    </div>

    <div class="flex">
      <a rel="external" href={shortLink} target="_blank" class="short-link">{shortLink}</a>
      {#if secured}
        <LockIcon width="18" height="18" fill="green" />
      {/if}
    </div>
  </div>
  <div class="date">{timeAgo(date)}</div>
  <span class="clicks">{clicks}</span>
  <div class="flex button-container"><LinkButton {shortLink} {toggleOpen} /></div>
</div>

{#if toggle}
  <QrCode shortenedURL={shortLink} {toggleClose} />
{/if}

<style>
  .link-container {
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    justify-content: space-evenly;
  }

  .index {
    width: 20px;
    height: 20px;
    font-weight: 500;
    font-size: 19px;
  }

  .link {
    margin: 20px 20px 20px 0;
    display: flex;
    flex-direction: column;
  }

  img {
    margin-right: 10px;
  }

  .long-link {
    font-size: 17px;
    color: #636363;
    display: inline-block;
    width: clamp(200px, 40vw, 900px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .short-link {
    margin-right: 6px;
    text-decoration: none;
    color: black;
    font-weight: 500;
    font-size: 19px;
  }

  .short-link:hover {
    text-decoration: underline;
  }

  .date {
    width: clamp(80px, 40vw, 100px);
    margin: 40px;
    font-size: 17px;
    color: #555555;
  }

  .clicks {
    margin: 20px;
    font-size: 19px;
  }

  .button-container {
    margin-right: 20px;
    border-radius: 5px;
    border: 1px solid #dfe1e5;
  }
</style>

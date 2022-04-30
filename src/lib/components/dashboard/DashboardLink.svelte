<script>
  import { timeAgo } from '$lib/utils/timeAgo';
  import LinkButton from '../recent/LinkButton.svelte';
  import QrCode from '$lib/components/shortener/QRCode.svelte';
  import Edit from './Edit.svelte';
  import { page } from '$app/stores';
  import ClicksIcon from '$lib/assets/ClicksIcon.svelte';
  import Link from '../Link.svelte';

  export let index;
  export let short_url;
  export let long_url;
  export let created_at;
  export let clicks;
  export let secured;
  export let tags;

  let shortLink = `${$page.url.origin}/${short_url}`;

  export let qrToggle = false;
  export let editToggle = false;

  const toggleQR = () => {
    qrToggle = true;
  };

  const toggleQRClose = () => {
    qrToggle = false;
  };

  const toggleEdit = () => {
    editToggle = true;
  };

  const toggleEditClose = () => {
    editToggle = false;
  };
</script>

<div class="flex link-container">
  <span class="index">{index}</span>
  <Link {shortLink} {long_url} {secured} {tags} />
  <div class="date">{timeAgo(created_at)}</div>
  <div class="clicks flex"><ClicksIcon /><span>{clicks}</span></div>
  <div class="button-container flex">
    <LinkButton short_url={shortLink} {toggleQR} {toggleEdit} />
  </div>
</div>

{#if qrToggle}
  <QrCode short_url={shortLink} {toggleQRClose} />
{/if}

{#if editToggle}
  <Edit short_url={shortLink} {toggleEditClose} {tags} shortId={short_url} />
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

  .date {
    width: clamp(80px, 40vw, 100px);
    margin: 40px;
    font-size: 17px;
    color: #555555;
  }

  .clicks {
    width: 40px;
    margin: 10px;
    align-items: flex-end;
    font-size: 19px;
  }

  .button-container {
    margin: 10px;
  }
</style>

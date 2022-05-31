<script>
  import RecentStore from '$lib/stores/RecentStore';
  import ShortenerInput from './ShortenerInput.svelte';
  import Shortening from './Shortening.svelte';
  import ErrorHandler from './ErrorHandler.svelte';
  import Shortened from './Shortened.svelte';
  import { clickOutside } from '$lib/utils/clickOutside';
  import { session } from '$app/stores';

  let long_url = '';
  let short_url = '';
  let isShortening = false;
  let isSecured = false;
  let error = '';
  let password = '';
  let clicked = false;

  async function handleURLSubmit(e) {
    let formData = new FormData();
    formData.append('url', long_url);
    formData.append('password', password);

    //If Error Retry
    if (error) {
      error = '';
    }

    isShortening = true; // Start Loading Animation

    const request = new Request('/api/shorturl', {
      method: 'POST',
      body: formData
    });

    let response = await fetch(request);
    let json = await response.json();

    if (response.ok) {
      short_url = `${window.location.origin}/${json.short_url}`;
      if (json.secured) {
        isSecured = true;
      }
      isShortening = false; // Stop Loading Animation
      let newLink = {
        long_url: json.long_url,
        short_url: short_url,
        created_at: json.created_at,
        secured: json.secured
      };
      if (!$session.user) {
        $RecentStore = [newLink, ...$RecentStore];
      }
    } else {
      isShortening = false; // Stop Loading Animation if there was an error
      error = json.error;
    }
  }

  const back = () => {
    error = '';
    short_url = '';
    long_url = '';
    password = '';
    isSecured = false;
  };
</script>

<div
  on:click={() => (clicked = true)}
  use:clickOutside
  on:click_outside={() => (clicked = false)}
  class="shortener-container flex"
  class:selected={clicked === true}
>
  <form
    autocomplete="off"
    class="flex grow fadeIn"
    method="post"
    on:submit|preventDefault={handleURLSubmit}
  >
    {#if isShortening}
      <Shortening />
    {:else if error}
      <ErrorHandler {long_url} {error} {back} />
    {:else if short_url}
      <Shortened {short_url} {isSecured} {back} />
    {:else}
      <ShortenerInput bind:long_url bind:password />
    {/if}
  </form>
</div>

<style>
  .shortener-container {
    width: clamp(320px, 90vw, 800px);
    height: 60px;
    background: #ffffff;
    border: 1px solid #dfe1e5;
    border-radius: 42px;
    margin-bottom: 50px;
    margin-top: 30px;
  }

  .shortener-container:hover {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }

  .selected {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }

  @media only screen and (max-width: 720px) {
    .shortener-container {
      flex-direction: column;
      height: 300px;
    }

    form {
      flex-direction: column;
      justify-content: center;
    }

    .selected {
      box-shadow: none;
    }

    .shortener-container:hover {
      box-shadow: none;
    }
  }
</style>

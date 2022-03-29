<script>
  import ShortenerInput from './ShortenerInput.svelte';
  import Shortening from './Shortening.svelte';
  import ErrorHandler from './ErrorHandler.svelte';
  import Shortened from './Shortened.svelte';

  let longURL = '';
  let shortenedURL = '';
  let isShortening = false;
  let error = '';
  let password = '';
  let clicked = false;

  async function handleURLSubmit(e) {
    let formData = new FormData();
    formData.append('url', longURL);
    formData.append('password', password);

    //If Error Retry
    if (error) {
      error = '';
    }

    // Start Loading Animation
    isShortening = true;

    const request = new Request('/api/shorturl', {
      method: 'POST',
      body: formData
    });

    let response = await fetch(request);
    let json = await response.json();

    if (response.ok) {
      shortenedURL = `${window.location.origin}/${json.short_url}`;
      console.log('finished');
      // Stop Loading Animation
      isShortening = false;
    } else {
      // Stop Loading Animation if there was an error
      isShortening = false;
      error = json.error;
    }
  }

  const back = () => {
    error = '';
    shortenedURL = '';
    longURL = '';
  };
</script>

<div
  on:click={() => (clicked = true)}
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
      <ErrorHandler {longURL} {error} {back} />
    {:else if shortenedURL}
      <Shortened {shortenedURL} {back} />
    {:else}
      <ShortenerInput bind:longURL bind:password />
    {/if}
  </form>
</div>

<style>
  .fadeIn {
    animation: fadeIn 0.5s;
  }

  .shortener-container {
    width: clamp(320px, 90vw, 800px);
    height: 60px;
    background: #ffffff;
    border: 1px solid #dfe1e5;
    border-radius: 42px;
    margin-top: 30px;
  }

  .shortener-container:hover {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
    border-color: rgba(223, 225, 229, 0);
  }

  .selected {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
    border-color: rgba(223, 225, 229, 0);
  }
</style>

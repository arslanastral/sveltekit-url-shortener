<script>
  import Loading from '$lib/assets/Loading.svelte';
  import Copybutton from './CopyButton.svelte';
  import Button from '$lib/components/Button.svelte';
  import WebIcon from '$lib/assets/WebIcon.svelte';
  import LockIcon from '$lib/assets/LockIcon.svelte';
  import Checkmark from '$lib/assets/Checkmark.svelte';

  let longURL = '';
  let shortenedURL = '';
  let isShrinking = false;
  let error = '';
  let password = '';

  async function handleURLSubmit(e) {
    let formData = new FormData();
    formData.append('url', longURL);
    formData.append('password', password);
    if (error) {
      error = '';
    }

    isShrinking = true;
    const request = new Request('/api/shorturl', {
      method: 'POST',
      body: formData
    });
    let response = await fetch(request);
    let json = await response.json();

    if (response.ok) {
      shortenedURL = `${window.location.origin}/${json.short_url}`;
      console.log('finished');
      isShrinking = false;
    } else {
      isShrinking = false;
      error = json.error;
    }
  }

  const back = () => {
    shortenedURL = '';
    longURL = '';
  };
</script>

<div class="form-container flex">
  <form
    autocomplete="off"
    class="flex grow fadeIn"
    method="post"
    on:submit|preventDefault={handleURLSubmit}
  >
    {#if isShrinking}
      <Loading /> <span style="font-size: 20px">Loading</span>
    {:else if error}
      <div class="flex grow">
        <span class="error grow">{error}</span><Button
          title="Retry"
          type="submit"
          --font-size="20px"
          --padding="8px 18px"
          --color="white"
          --bg-color="black"
          --border-radius="29px"
        />
      </div>
    {:else if shortenedURL}
      <div class="flex grow">
        <Checkmark />
        <a
          class="shortened-link fadeIn"
          href={shortenedURL}
          target="_blank"
          rel="noopener noreferrer">{shortenedURL}</a
        >
      </div>

      <Copybutton />
      <Button
        title="Back"
        onClickFunc={back}
        type="button"
        --font-size="20px"
        --padding="8px 28px"
        --color="white"
        --bg-color="black"
        --border-radius="29px"
      />
    {:else}
      <div class="flex grow">
        <div class="flex grow-2">
          <WebIcon />
          <input bind:value={longURL} placeholder="Paste Long URL Here" type="url" required />
        </div>

        <div class="flex grow">
          <LockIcon />
          <input bind:value={password} placeholder="Password" type="password" />
        </div>
      </div>

      <Button
        title="Shortern"
        type="submit"
        --font-size="20px"
        --padding="8px 18px"
        --color="white"
        --bg-color="#3E5DFF"
        --border-radius="29px"
      />
    {/if}
  </form>
</div>

<style>
  .fadeIn {
    animation: fadeIn 0.5s;
  }

  .form-container {
    width: clamp(320px, 90vw, 800px);
    height: 60px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 42px;
    margin-top: 30px;
  }

  input {
    font-size: 20px;
    background: none;
    border: 0;
    width: 100%;
  }

  input:focus {
    outline: none;
    border: 0;
  }

  .shortened-link {
    font-size: 20px;
    margin-left: 8px;
    text-decoration: none;
  }

  .shortened-link:hover {
    text-decoration: underline;
  }

  .error {
    font-size: 20px;
    color: red;
    margin-left: 15px;
  }
</style>

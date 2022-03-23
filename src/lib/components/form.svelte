<script>
  import Button from '$lib/components/button.svelte';
  import WebIcon from '$lib/assets/WebIcon.svelte';
  import LockIcon from '$lib/assets/LockIcon.svelte';
  import Checkmark from '$lib/assets/Checkmark.svelte';
  let URL = '';
  let shortenedURL = '';

  async function handleURLSubmit(e) {
    const request = new Request('/api/shorturl', {
      method: 'POST',
      body: new FormData(e.target)
    });
    let response = await fetch(request);

    let json = await response.json();
    shortenedURL = `${window.location.origin}/api/${json.short_url}`;
  }

  const back = () => {
    shortenedURL = '';
    URL = '';
  };
</script>

<div class="flex justify-sb form-container">
  {#if shortenedURL}
    <div class="input-container flex">
      <div class="flex url-input">
        <Checkmark />
        <div class="url-text">
          <a href={shortenedURL} target="_blank" rel="noopener noreferrer">{shortenedURL}</a>
        </div>
      </div>
    </div>
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
    <form class="flex form" method="post" on:submit|preventDefault={handleURLSubmit}>
      <div class="input-container flex">
        <div class="flex url-input">
          <WebIcon />
          <input
            bind:value={URL}
            placeholder="Paste Long URL Here"
            type="url"
            name="url"
            required
          />
        </div>

        <div class="flex password-input">
          <LockIcon />
          <input placeholder="Password" type="password" name="password" />
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
    </form>
  {/if}
</div>

<style>
  .flex {
    display: flex;
    align-items: center;
  }

  .form-container {
    width: clamp(320px, 90vw, 800px);
    height: 60px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 42px;
  }

  .justify-sb {
    justify-content: space-between;
  }

  .form {
    width: 100%;
    justify-content: space-between;
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

  .url-text {
    font-size: 20px;
    margin-left: 8px;
    width: 100%;
  }

  .input-container {
    width: 80%;
  }

  .url-input {
    flex: 2;
  }

  .password-input {
    flex: 1;
  }
</style>

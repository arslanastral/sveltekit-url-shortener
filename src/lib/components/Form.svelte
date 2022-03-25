<script>
  import Loading from '$lib/assets/Loading.svelte';
  import Copybutton from './CopyButton.svelte';
  import Button from '$lib/components/Button.svelte';
  import WebIcon from '$lib/assets/WebIcon.svelte';
  import LockIcon from '$lib/assets/LockIcon.svelte';
  import Checkmark from '$lib/assets/Checkmark.svelte';

  let shortenedURL = '';
  let isShrinking = false;

  async function handleURLSubmit(e) {
    isShrinking = true;
    const request = new Request('/api/shorturl', {
      method: 'POST',
      body: new FormData(e.target)
    });
    let response = await fetch(request);

    let json = await response.json();
    shortenedURL = `${window.location.origin}/${json.short_url}`;
    console.log('finished');
    isShrinking = false;
  }

  const back = () => {
    shortenedURL = '';
  };
</script>

<div class="form-container flex">
  {#if isShrinking}
    <Loading /> <span style="font-size: 20px">nom.. nom</span>
  {:else if shortenedURL}
    <div class="flex grow">
      <Checkmark />
      <a class="shortened-link fadeIn" href={shortenedURL} target="_blank" rel="noopener noreferrer"
        >{shortenedURL}</a
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
    <form
      autocomplete="off"
      class="flex grow fadeIn"
      method="post"
      on:submit|preventDefault={handleURLSubmit}
    >
      <div class="flex grow">
        <div class="flex grow-2">
          <WebIcon />
          <input placeholder="Paste Long URL Here" type="url" name="url" required />
        </div>

        <div class="flex grow">
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

  .fadeIn {
    animation: fadeIn 0.5s;
  }

  .form-container {
    width: clamp(320px, 90vw, 800px);
    height: 60px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 42px;
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

  .grow-2 {
    flex: 2;
  }

  .grow {
    flex: 1;
  }
</style>

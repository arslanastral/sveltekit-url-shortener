<script>
  import Button from '$lib/components/Button.svelte';
  import WebIcon from '$lib/assets/WebIcon.svelte';
  import LockIcon from '$lib/assets/LockIcon.svelte';

  export let long_url;
  export let password;
</script>

<div class="input-container flex grow fadeIn">
  <div class="input-wrapper flex grow-2">
    <WebIcon />
    <input bind:value={long_url} placeholder="Paste Long URL Here" type="url" required />
  </div>

  <div class="input-wrapper flex grow">
    <LockIcon />
    <input bind:value={password} placeholder="Password" type="password" autocomplete="on" />
  </div>
</div>

<div class="shorten-button">
  <Button
    title="Shortern"
    type="submit"
    --font-size="20px"
    --padding="8px 18px"
    --color="white"
    --bg-color="#3E5DFF"
    --border-radius="29px"
  />
</div>

<style>
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

  @media only screen and (max-width: 720px) {
    .input-container {
      flex-direction: column;
      align-content: flex-start;
      justify-content: center;
    }

    .input-wrapper {
      box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.25);
      border-radius: 51px;
      flex: 0;
      margin: 20px;
    }

    .shorten-button {
      margin-bottom: 25px;
    }
  }
</style>

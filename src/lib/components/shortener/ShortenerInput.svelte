<script>
  import Button from '$lib/components/Button.svelte';
  import WebIcon from '$lib/assets/WebIcon.svelte';
  import LockIcon from '$lib/assets/LockIcon.svelte';

  export let longURL;
  export let password;
</script>

<div class="flex grow fadeIn">
  <div class="flex grow-2">
    <WebIcon />
    <input bind:value={longURL} placeholder="Paste Long URL Here" type="url" required />
  </div>

  <div class="flex grow">
    <LockIcon />
    <input bind:value={password} placeholder="Password" type="password" autocomplete="on" />
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
  --active-bg="#3E5DFF"
/>

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
</style>

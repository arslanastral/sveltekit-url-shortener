<script>
  import Button from '$lib/components/button.svelte';
  import WebIcon from '$lib/assets/WebIcon.svelte';
  import LockIcon from '$lib/assets/LockIcon.svelte';
  let URL = '';
</script>

<div class="form-container">
  <form class="flex form" action="/api" method="post">
    <div class="input-container flex">
      <div class="flex url-input">
        <WebIcon />
        <input bind:value={URL} placeholder="Paste Long URL Here" type="url" name="url" required />
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
</div>

<style>
  .flex {
    display: flex;
    align-items: center;
  }

  .form-container {
    width: 800px;
    height: 60px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 42px;
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

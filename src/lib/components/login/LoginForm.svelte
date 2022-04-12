<script>
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import Button from '../Button.svelte';

  export let title;
  export let endpoint;
  export let redirect = '/';
  export let buttonTitle;
  export let isForSignUp;

  let name = '';
  let email = '';
  let password = '';
  let error = '';

  async function handleSubmit() {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        ...(isForSignUp && { name }),
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let json = await res.json();

    if (res.ok) {
      $session.user = json.user;
      goto(redirect);
    } else {
      error = json.error;
    }
  }
</script>

<div class="fadeIn flex container">
  <div class="title">{title}</div>

  <div class="login-container">
    {#if isForSignUp}
      <input
        bind:value={name}
        placeholder="Name"
        name="name"
        type="text"
        autocomplete="on"
        maxlength="20"
      />
    {/if}
    <input
      bind:value={email}
      placeholder="Email"
      name="email"
      type="email"
      required
      autocomplete="on"
    />
    <input
      bind:value={password}
      placeholder="Password"
      name="password"
      type="password"
      required
      autocomplete="on"
    />
    <Button
      title={buttonTitle}
      onClickFunc={handleSubmit}
      type="button"
      --font-size="20px"
      --padding="8px 18px"
      --color="white"
      --bg-color="#3E5DFF"
      --border-radius="6px"
    />
  </div>
</div>

<style>
  .container {
    background-color: white;
    width: 386px;
    height: 494px;
    box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
    flex-direction: column;
    justify-content: space-around;
  }

  .title {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.045em;
    margin-top: 10px;
    color: #000000;
  }

  .login-container {
    width: 90%;
  }

  input {
    font-size: 20px;
    background: none;
    border: 1px solid #dfe1e5;
    border-radius: 6px;
    width: 100%;
    margin-bottom: 20px;
  }

  input:focus {
    outline: none;
  }
</style>

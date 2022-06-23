<script>
  import ButtonLoader from '$lib/assets/ButtonLoader.svelte';
  import EyeHiddenIcon from '$lib/assets/EyeHiddenIcon.svelte';
  import EyeIcon from '$lib/assets/EyeIcon.svelte';
  import { isValidEmail } from '$lib/utils/isValidEmail';
  import Logo from '../Logo.svelte';
  export let title;
  export let endpoint;
  export let redirect = '/';
  export let buttonTitle;
  export let isForSignUp;

  let name = '';
  let email = '';
  let password = '';
  let error = '';
  let textToggled = false;
  let checklistToggled = false;
  let isLoading = false;
  $: type = textToggled ? 'text' : 'password';

  async function handleSubmit() {
    if (isForSignUp && !name) {
      error = 'Please enter your name';
      return;
    }

    if (!isValidEmail(email)) {
      error = 'Please enter a valid email address';
      return;
    }

    if (!password) {
      error = 'Please enter your password';
      return;
    }

    isLoading = true;
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
      setTimeout(() => {
        isLoading = false;
      }, 700);
      window.location.href = redirect;
    } else {
      // artificial delay to avoid flashing
      setTimeout(() => {
        isLoading = false;
      }, 700);

      error = json.error;
    }
  }

  function onPassword(event) {
    if (!checklistToggled) {
      checklistToggled = true;
    }
    password = event.target.value;
  }

  const togglePassword = () => {
    textToggled = !textToggled;
  };
</script>

<div class="fadeIn flex container">
  <div class="info-header flex">
    <Logo />
    <div class="title">{title}</div>
  </div>

  <div class="login-container">
    {#if isForSignUp}
      <div class="input-container flex">
        <input
          bind:value={name}
          placeholder=" "
          name="name"
          type="text"
          autocomplete="on"
          maxlength="20"
        />
        <label for="name" class="placeholder">Name</label>
      </div>
    {/if}
    <div class="input-container flex">
      <input
        bind:value={email}
        placeholder=" "
        name="email"
        type="email"
        required
        autocomplete="on"
      />
      <label for="email" class="placeholder">Email</label>
    </div>
    <div class="input-container flex">
      <input
        on:input={onPassword}
        placeholder=" "
        name="password"
        {type}
        required
        autocomplete="on"
      />
      <label for="password" class="placeholder">Password</label>
      <button on:click={togglePassword} class="toggle-button flex">
        {#if textToggled}
          <EyeHiddenIcon fill="grey" width="25" />
        {:else}
          <EyeIcon fill="grey" width="25" />
        {/if}
      </button>
    </div>

    {#if isForSignUp && checklistToggled}
      <div class="password-checklist" />
    {/if}

    <div class="error">{error}</div>
    <button on:click={handleSubmit} class="auth-button flex grow">
      {#if isLoading}
        <ButtonLoader width="100%" height="100%" />
      {:else}
        <span class="fadeIn"> {buttonTitle}</span>
      {/if}
    </button>
  </div>
  {#if isForSignUp}
    <div class="existing-auth">
      Already have an account? <a class="link" href="/login">Log in</a>
    </div>
  {:else}
    <div class="existing-auth">
      Dont have an account? <a class="link" href="/signup">Sign up</a>
    </div>
  {/if}
</div>

<style>
  .container {
    background-color: white;
    width: 400px;
    min-height: 596px;
    box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
    flex-direction: column;
    justify-content: space-around;
  }

  .info-header {
    flex-direction: column;
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

  .input-container {
    border: 1px solid #dfe1e5;
    margin: 20px 0;
    border-radius: 6px;
    height: 50px;
    position: relative;
  }

  .input-container:focus-within {
    border: 1px solid rgb(51, 51, 255);
  }

  input {
    font-size: 20px;
    background: none;
    border: none;
    height: 100%;
    flex: 1;
  }

  input:focus ~ .placeholder,  /* Input has focus */
input:not(:placeholder-shown) ~ .placeholder  /* Input has a value */ {
    transform: translateY(-25px) translateX(-15px) scale(0.75);
    background-color: white;
    padding: 2px 10px;
    color: rgb(51, 51, 255);
  }

  .placeholder {
    font-size: 20px;
    color: grey;
    transition: transform 200ms, color 200ms;
    position: absolute;
    left: 20px;
    pointer-events: none;
  }

  input:focus {
    outline: none;
  }

  .toggle-button {
    border: none;
    height: 100%;
    transition: transform ease-out 0.1s;
  }

  .toggle-button:active {
    transform: scale(0.9);
  }

  .password-checklist {
    color: black;
    border: 1px solid #3e5dff;
    border-radius: 8px;
    height: 218px;
  }

  .error {
    color: red;
    font-size: 14px;
    margin: 10px 0;
  }

  .existing-auth {
    margin: 15px 0;
    color: grey;
  }

  .link {
    color: #3e5dff;
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
  }

  .auth-button {
    font-size: 18px;
    width: 100%;
    margin-top: 20px;
    justify-content: center;
    border: none;
    background-color: #3e5dff;
    color: white;
    height: 40px;
    border-radius: 6px;
    transition: transform ease-out 0.09s;
  }

  .auth-button:active {
    transform: scale(0.97);
  }
</style>

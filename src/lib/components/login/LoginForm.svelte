<script>
  import Button from '../Button.svelte';

  export let title;
  export let action;
  export let buttonTitle;
  export let isForSignUp;
</script>

<div class="fadeIn flex container">
  <div class="title">{title}</div>

  <div class="form-container">
    <form class="flex" method="post" {action}>
      {#if isForSignUp}
        <input placeholder="Username" name="name" type="text" required autocomplete="on" />
      {/if}
      <input placeholder="Email" name="email" type="email" required autocomplete="on" />
      <input placeholder="Password" name="password" type="password" required autocomplete="on" />
      <Button
        title={buttonTitle}
        type="submit"
        --font-size="20px"
        --padding="8px 18px"
        --color="white"
        --bg-color="#3E5DFF"
        --border-radius="6px"
      />
    </form>
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

  .form-container {
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

  form {
    flex-direction: column;
  }
</style>

<script>
  import Button from '../Button.svelte';
</script>

<div class="fadeIn flex unlock-container">
  <div class="flex info-container">
    <div class="title">Create an account</div>
    <div class="subtitle">Short Links. Big Impact</div>
  </div>

  <div class="form-container">
    <form class="flex" method="post" action={`/api/auth/signup`}>
      <input placeholder="Your Name" name="name" type="text" required autocomplete="on" />
      <input placeholder="Email" name="email" type="email" required autocomplete="on" />
      <input placeholder="Password" name="password" type="password" required autocomplete="on" />
      <Button
        title="Sign Up"
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
  .unlock-container {
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

  .subtitle {
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: -0.045em;

    color: #5f5f5f;
  }

  .info-container {
    flex-direction: column;
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

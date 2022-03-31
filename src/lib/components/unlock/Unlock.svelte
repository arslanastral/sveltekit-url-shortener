<script>
  import Button from '../Button.svelte';
  export let id;
</script>

<div class="flex unlock-container">
  <div class="flex info-container">
    <div class="lock-icon" />
    <div class="title">This Link is Protected</div>
    <div class="subtitle">Use Your Password To Unlock</div>
  </div>

  <div class="form-container">
    <form class="flex" method="post" action={`/api/${id}`}>
      <input placeholder="Password" name="password" type="password" />
      <Button
        title="Unlock"
        type="submit"
        --font-size="20px"
        --padding="8px 18px"
        --color="white"
        --bg-color="#3E5DFF"
        --border-radius="6px"
        --active-bg="#3E5DFF"
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

  .lock-icon {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background-color: #3e5dff;
  }

  .title {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.045em;

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
    /* border: 0; */
  }

  form {
    flex-direction: column;
  }
</style>

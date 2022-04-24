<script>
  import { goto } from '$app/navigation';

  import { session } from '$app/stores';
  import Button from '../Button.svelte';
</script>

<div class="container flex">
  <div class="header">
    <span class="header-title">Account</span>
    <span class="header-info">Warning: Actions on this page can be destructive</span>
  </div>

  <div class="info-container">
    <div class="user-info flex">
      <span class="title">Password</span>
      <input type="password" placeholder="Old Password" />
      <input type="password" placeholder="New Password" />
    </div>

    <Button
      title="Change"
      onClickFunc={() => goto('/settings/profile')}
      type="button"
      --font-size="20px"
      --padding="4px 18px"
      --color="white"
      --bg-color="#0000f4"
      --border-radius="29px"
    />

    <div class="delete-container">
      <div class="user-info">
        <span class="title">Delete Your Account</span>
        <span class="header-info">This will permanently delete your account and all your links</span
        >
      </div>

      <Button
        title="Delete"
        onClickFunc={() => goto('/settings/profile')}
        type="button"
        --font-size="20px"
        --padding="4px 18px"
        --color="white"
        --bg-color="red"
        --border-radius="29px"
      />
    </div>
  </div>
</div>

<style>
  .container {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .header {
    width: 100%;
    color: white;
    margin-bottom: 20px;
    background-color: black;
    padding: 40px 60px;
  }

  .header-title {
    display: block;
    font-size: 30px;
  }

  .header-info {
    color: rgb(156, 156, 156);
    font-weight: normal;
    font-size: 17px;
    letter-spacing: -0.025em;
  }

  .info-container {
    padding: 0 60px;
    flex-direction: column;
    align-items: flex-start;
  }

  .user-info {
    flex-direction: column;
    align-items: flex-start;
    margin: 30px 0;
  }

  .title {
    font-size: 28px;
    display: block;
  }

  .delete-container {
    margin: 50px 0;
  }

  input {
    font-size: 20px;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 100%;
    margin: 10px 0;
  }

  input:focus {
    outline: none;
    border: 1px solid #3710e6;
  }
</style>

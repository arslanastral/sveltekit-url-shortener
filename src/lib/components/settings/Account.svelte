<script>
  import { goto } from '$app/navigation';

  import { session } from '$app/stores';
  import Button from '../Button.svelte';
</script>

<div class="info-container flex">
  <div class="welcome">
    <span class="welcome-title">Account</span>
    <span class="welcome-info">Warning: Actions on this page can be destructive</span>
  </div>

  <div class="input-container">
    <div class="user-info">
      <span class="title">Password</span>
      <input class="detail" type="password" placeholder="Old Password" />
      <input class="detail" type="password" placeholder="New Password" />
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
        <span class="welcome-info"
          >This will permanently delete your account and all your links</span
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
  .info-container {
    flex-direction: column;
    align-items: flex-start;
    margin: 60px;
  }

  .input-container {
    margin-top: 40px;
  }

  .user-info {
    margin: 20px 0;
  }

  .welcome-title {
    display: block;
    font-size: 30px;
  }

  .welcome-info {
    color: rgb(80, 80, 80);
    font-weight: normal;
    font-size: 17px;
    letter-spacing: -0.025em;
  }

  .title {
    font-size: 28px;
    display: block;
  }

  .detail {
    font-size: 20px;
    font-weight: normal;
  }

  .delete-container {
    margin-top: 50px;
  }

  input {
    font-size: 20px;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 60%;
    margin: 10px 0;
  }

  input:focus {
    outline: none;
    border: 1px solid #3710e6;
  }
</style>

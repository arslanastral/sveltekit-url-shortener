<script>
  import { goto } from '$app/navigation';

  import { session } from '$app/stores';
  import Button from '../Button.svelte';
</script>

<div class="info-container flex">
  <div class="welcome">
    <span class="welcome-title">Profile</span>
    <span class="welcome-info">To save your profile, click on change button</span>
  </div>

  <div class="input-container">
    <div class="user-info">
      <span class="title">Name</span>
      <input class="detail" type="text" placeholder={$session.user.name} />
    </div>

    <div class="user-info">
      <span class="title">Email</span>
      <input class="detail" type="email" placeholder={$session.user.email} />
    </div>
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
    margin: 10px 0;
  }
  .welcome {
    margin-bottom: 30px;
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
    /* font-weight: 500; */
    display: block;
  }

  .user-info {
    margin-bottom: 30px;
  }

  .detail {
    font-size: 20px;
    font-weight: normal;
  }

  input {
    font-size: 20px;
    background: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 100%;
  }

  input:focus {
    outline: none;
    border: 1px solid #3710e6;
  }
</style>

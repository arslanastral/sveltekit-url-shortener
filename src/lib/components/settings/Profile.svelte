<script>
  import { goto } from '$app/navigation';

  import { session } from '$app/stores';
  import Button from '../Button.svelte';
</script>

<div class="container flex">
  <div class="header">
    <span class="header-title">Profile</span>
    <span class="header-info">To edit your profile, click update</span>
  </div>

  <div class="info-container flex">
    <div class="user-info">
      <span class="title">Name</span>
      <input type="text" placeholder={$session.user.name} />
    </div>

    <div class="user-info">
      <span class="title">Email</span>
      <input type="email" placeholder={$session.user.email} />
    </div>

    <Button
      title="Update"
      onClickFunc={() => goto('/settings/profile')}
      type="button"
      --font-size="20px"
      --padding="4px 18px"
      --color="white"
      --bg-color="#0000f4"
      --border-radius="29px"
    />
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
    margin-bottom: 50px;
  }

  .user-info {
    margin: 30px 0;
  }

  .title {
    font-size: 28px;
    display: block;
  }

  input {
    font-size: 25px;
    /* background: none; */
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 100%;
  }

  input:focus {
    outline: none;
    border: 1px solid #3710e6;
  }
</style>

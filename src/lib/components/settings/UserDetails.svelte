<script>
  import { goto } from '$app/navigation';

  import { session } from '$app/stores';
  import Button from '../Button.svelte';
</script>

<div class="info-container flex">
  <div class="welcome">
    <span class="welcome-title">Welcome, {$session.user.name}</span>
    <span class="welcome-info">To update your info, click on the edit button</span>
  </div>

  <div class="user-info">
    <span class="title">Name</span>
    <span class="detail">{$session.user.name}</span>
  </div>

  <div class="user-info">
    <span class="title">Email</span>
    <span class="detail">{$session.user.email}</span>
  </div>

  <div class="user-info">
    <span class="title">Joined</span>
    <span class="detail">{$session.user.joined}</span>
  </div>

  <Button
    title="Edit"
    onClickFunc={() => goto('/settings/profile')}
    type="button"
    --font-size="20px"
    --padding="4px 25px"
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

  .user-info {
    margin: 30px 0;
  }

  .welcome {
    margin-bottom: 40px;
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

  .user-info {
    margin-bottom: 30px;
  }

  .detail {
    font-size: 25px;
    font-weight: normal;
    color: #0000f4;
  }

  .change-button {
    margin-left: 0px;
  }
</style>

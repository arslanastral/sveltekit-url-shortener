<script>
  import { goto } from '$app/navigation';

  import { session } from '$app/stores';
  import Button from '../Button.svelte';
</script>

<div class="container flex">
  <div class="header">
    <span class="header-title">Welcome, {$session.user.name}</span>
    <span class="header-info">To update your info, click on the edit button</span>
  </div>

  <div class="info-container flex">
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

  .detail {
    font-size: 25px;
    font-weight: normal;
    color: #0000f4;
  }
</style>

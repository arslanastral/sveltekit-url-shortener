<script>
  import { session } from '$app/stores';
</script>

<div class="user-info flex">
  <div class="welcome">
    <span class="welcome-title">Welcome, {$session.user.name}</span>
    <span class="welcome-info">To change your settings, click on the pencil icon</span>
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
</div>

<style>
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    margin: 30px 20px 20px 30px;
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
    font-weight: 500;
    display: block;
  }

  .user-info {
    margin-bottom: 30px;
  }

  .detail {
    font-size: 25px;
    font-weight: normal;
  }
</style>

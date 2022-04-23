<script>
  import { session } from '$app/stores';
</script>

<div class="user-info flex">
  <div class="welcome">
    <span class="welcome-title">Profile</span>
    <span class="welcome-info">To edit your profile, click on save button</span>
  </div>

  <div class="user-info">
    <span class="title">Name</span>
    <input class="detail" type="text" placeholder={$session.user.name} />
  </div>

  <div class="user-info">
    <span class="title">Email</span>
    <input class="detail" type="email" placeholder={$session.user.email} />
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

<script>
  import { session } from '$app/stores';
</script>

<div class="user-info flex">
  <div>Welcome, {session.user.name}</div>
  <div class="user-info__name flex">
    <span>Name</span>
    <h1>{$session.user.name}</h1>
  </div>

  <div class="user-info__email flex">
    <span>Name</span>
    <h2>{$session.user.email}</h2>
  </div>
</div>

<style>
  .user-info {
    flex-direction: column;
  }
</style>

<script>
  import DashboardLink from './DashboardLink.svelte';
</script>

<div class="flex title-container">
  <div class="title">Dashboard</div>
</div>
<div class="grow links-wrapper" />

<style>
  .title-container {
    width: 80%;
  }
  .title {
    font-size: 35px;
    font-weight: bold;
    margin: 10px 0;
  }
  .links-wrapper {
    width: 80%;
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
  }
</style>
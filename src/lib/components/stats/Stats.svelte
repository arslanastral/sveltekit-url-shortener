<script>
  import StatsIcon from '$lib/assets/StatsIcon.svelte';
</script>

<div class="stats-container">
  <div class="flex"><StatsIcon /><span class="stats-title">Platform Stats</span></div>
  <div />
</div>

<style>
  .stats-container {
    width: clamp(320px, 90vw, 800px);
    height: 200px;
    background: #feffb1;
    /* border: 1px solid #dfe1e5; */
    border-radius: 12px;
    margin-top: 50px;
  }

  .stats-title {
    font-size: 22px;
    font-weight: 500;
    margin-left: 5px;
    margin-top: 4px;
  }
</style>

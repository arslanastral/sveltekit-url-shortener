<script>
  import StatsBox from './StatsBox.svelte';
  import StatsIcon from '$lib/assets/StatsIcon.svelte';
</script>

<div class="flex stats-container">
  <div class="flex"><StatsIcon /><span class="stats-title">Platform Stats</span></div>
  <div class="flex box-wrapper">
    <StatsBox countType="Shortened" --count-color="#3e5dff" />
    <StatsBox countType="Clicks" --count-color="#FF59A9" />
    <StatsBox countType="Views" --count-color="#FF902A" />
  </div>
</div>

<style>
  .stats-container {
    width: clamp(320px, 90vw, 800px);
    /* height: 200px; */
    /* background: #feffb1; */
    /* border: 1px solid #dfe1e5; */
    border-radius: 12px;
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
  }

  .stats-title {
    font-size: 22px;
    font-weight: 500;
    margin-left: 5px;
    margin-top: 4px;
  }
  .box-wrapper {
    margin-top: 10px;
    gap: 20px;
  }
</style>

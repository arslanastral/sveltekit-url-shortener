<script>
  import StatsBox from './StatsBox.svelte';
  import StatsIcon from '$lib/assets/StatsIcon.svelte';
  import LinkIcon from '$lib/assets/LinkIcon.svelte';
  import ClickIcon from '$lib/assets/ClickIcon.svelte';
  import EyeIcon from '$lib/assets/EyeIcon.svelte';
</script>

<div class="flex stats-container">
  <div class="flex"><StatsIcon /><span class="stats-title">Platform Stats</span></div>
  <div class="flex box-wrapper">
    <StatsBox count="78" countType="Shortened" --count-color="#3e5dff"
      ><LinkIcon slot="icon" /></StatsBox
    >
    <StatsBox count="80" countType="Clicks" --count-color="#FF59A9"
      ><ClickIcon slot="icon" /></StatsBox
    >
    <StatsBox count="20" countType="Views" --count-color="#FF902A"><EyeIcon slot="icon" /></StatsBox
    >
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

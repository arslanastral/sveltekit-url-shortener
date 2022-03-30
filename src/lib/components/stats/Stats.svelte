<script>
  import { onMount } from 'svelte';
  import StatsBox from './StatsBox.svelte';
  import StatsIcon from '$lib/assets/StatsIcon.svelte';
  import LinkIcon from '$lib/assets/LinkIcon.svelte';
  import ClickIcon from '$lib/assets/ClickIcon.svelte';
  import ShieldIcon from '$lib/assets/ShieldIcon.svelte';

  let shortened = '0';
  let clicks = '0';
  let secured = '0';
  onMount(async () => {
    const res = await fetch('http://localhost:3000/api/stats');
    const result = await res.json();

    if (res.ok) {
      shortened = result.shortened;
      clicks = result.clicks;
      secured = result.secured;
    } else {
      shortened = 'Error';
      clicks = 'Error';
      secured = 'Error';
    }
  });
</script>

<div class="flex stats-container">
  <div class="flex"><StatsIcon /><span class="stats-title">Platform Stats</span></div>
  <div class="flex box-wrapper">
    <StatsBox count={shortened} countType="Shortened" --count-color="#3e5dff"
      ><LinkIcon slot="icon" /></StatsBox
    >
    <StatsBox count={clicks} countType="Clicks" --count-color="#FF59A9"
      ><ClickIcon slot="icon" /></StatsBox
    >
    <StatsBox count={secured} countType="Secured" --count-color="#FF902A"
      ><ShieldIcon slot="icon" /></StatsBox
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

<script>
  import StatsBox from './StatsBox.svelte';
  import StatsIcon from '$lib/assets/StatsIcon.svelte';
  import LinkIcon from '$lib/assets/LinkIcon.svelte';
  import ClickIcon from '$lib/assets/ClickIcon.svelte';
  import ShieldIcon from '$lib/assets/ShieldIcon.svelte';

  export let shortened;
  export let clicks;
  export let secured;
</script>

<div class="flex stats-container">
  <div class="flex"><StatsIcon /><span class="stats-title">API Stats</span></div>
  <div class="flex box-wrapper">
    <StatsBox count={shortened} countType="Shortened" --count-color="#3e5dff"
      ><LinkIcon slot="icon" /></StatsBox
    >
    <StatsBox count={clicks} countType="Clicks" --count-color="#F21E85"
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
    width: 100%;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 466px) {
    .box-wrapper {
      justify-content: center;
    }

    .stats-container {
      align-items: center;
    }
  }
</style>

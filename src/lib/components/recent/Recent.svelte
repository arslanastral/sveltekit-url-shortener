<script>
  import ActivityIcon from '$lib/assets/ActivityIcon.svelte';
</script>

<div class="recent-container">
  <div class="flex"><ActivityIcon /><span class="recent-title">Recently Shortened</span></div>
  <div class="recent-links-container" />
</div>

<style>
  .recent-container {
    width: clamp(320px, 90vw, 800px);
    height: 250px;

    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
  }

  .recent-links-container {
    margin-top: 10px;
    background: #3e5dff;
    border-radius: 12px;
    width: 100%;
    height: 90%;
  }

  .recent-title {
    font-size: 22px;
    font-weight: 500;
    margin-left: 5px;
    margin-top: 4px;
  }
</style>

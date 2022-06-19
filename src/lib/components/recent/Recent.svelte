<script>
  import { RecentStore } from '$lib/stores/RecentStore';
  import ActivityIcon from '$lib/assets/ActivityIcon.svelte';
  import RecentLink from './RecentLink.svelte';
  import { timeAgo } from '$lib/utils/timeAgo';
</script>

{#if $RecentStore.length}
  <div class="fadeIn recent-container">
    <div class="flex"><ActivityIcon /><span class="recent-title">History</span></div>
    <div class="recent-links-container">
      {#each $RecentStore as link}
        <RecentLink
          date={timeAgo(link.created_at)}
          isSecure={link.secured}
          long_url={link.long_url}
          short_url={link.short_url}
        />
      {/each}
    </div>
  </div>
{/if}

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
    background: #ffffff;
    border: 1px solid #dfe1e5;
    border-radius: 12px;
    width: 100%;
    height: 90%;
    overflow-y: auto;
  }

  .recent-title {
    font-size: 22px;
    font-weight: 500;
    margin-left: 5px;
    margin-top: 4px;
  }
</style>

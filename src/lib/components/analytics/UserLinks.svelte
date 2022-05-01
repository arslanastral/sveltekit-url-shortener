<script>
  import Links from '$lib/stores/LinkStore';
  import Link from '../Link.svelte';
</script>

<div class="links-container">
  {#if $Links.length}
    {#each $Links as link, i}
      <div class="link-wrapper flex">
        <Link
          secured={link.secured}
          long_url={link.long_url}
          short_url={link.short_url}
          --margin="20px 20px 20px 20px"
        />
      </div>
    {/each}
  {:else}
    <div class="flex">
      <div class="no-links">You haven't shortened any links yet.</div>
    </div>
  {/if}
</div>

<style>
  .links-container {
    background: #ffffff;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    min-height: 550px;
    width: 40%;
  }

  .link-wrapper {
    width: 100%;
    border-bottom: 1px solid #eaeaea;
  }

  .no-links {
    font-size: 20px;
    color: #636363;
    margin: 20px;
  }
</style>

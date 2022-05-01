<script>
  import Links from '$lib/stores/LinkStore';
  import Link from '../Link.svelte';
</script>

<div class="links-container">
  {#if $Links.length}
    {#each $Links as link, i}
      <div class="link flex">
        <Link
          secured={link.secured}
          long_url={link.long_url}
          shortLink={link.short_url}
          tags={link.tags}
        />
      </div>
    {/each}
  {:else}
    <div class="link flex">
      <div class="no-links">
        You haven't shortned any links yet. When you do they will show here.
      </div>
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

  .link {
    width: 100%;
    border-bottom: 1px solid #eaeaea;
  }

  .no-links {
    font-size: 20px;
    color: #636363;
    margin: 20px;
  }
</style>

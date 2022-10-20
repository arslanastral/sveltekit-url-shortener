<script>
  import { page } from '$app/stores';
</script>

<div class="wrapper">
  <div class="not-found">
    {#if $page.status.toString() === '404'}
      <h1>{$page.status} {$page.error.message}</h1>
      <p>The page you are looking for doesn't exist.</p>
      <a class="homepage-link" href="/">Return</a>
    {:else}
      <h1>Something went wrong</h1>
      <a class="homepage-link" href="/">Return</a>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    background-repeat: repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    font-family: Inter;
  }

  h1 {
    font-size: 5.5rem;
    font-weight: bold;
    margin: 0;
  }

  .not-found {
    display: flex;
    flex-direction: column;
  }

  p {
    margin: 0;
    color: grey;
    font-size: 28px;
  }

  .homepage-link {
    margin-top: 30px;
    font-size: 30px;
  }
</style>

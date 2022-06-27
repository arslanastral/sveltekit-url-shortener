<script context="module">
  export function load({ status }) {
    return {
      props: {
        error: status
      }
    };
  }
</script>

<script>
  export let error;
</script>

<div class="wrapper">
  {#if error.toString() === '404'}
    <div class="not-found flex">
      <h1>{error}</h1>
      <p>The page you are looking for doesn't exist.</p>
    </div>
  {:else}
    <h1>Something went wrong 😭</h1>
  {/if}
</div>

<style>
  .wrapper {
    background-repeat: repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 65vh;
  }

  h1 {
    font-size: 5.5rem;
    font-weight: bold;
    margin: 0;
  }

  .not-found {
    flex-direction: column;
  }

  p {
    margin: 0;
    color: grey;
    font-size: 28px;
  }
</style>

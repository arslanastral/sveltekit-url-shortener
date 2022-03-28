<script>
  import Error from './Error.svelte';

  export let longURL;
  export let error;
  export let back;

  const isFromSameDomain = (string) => {
    let url = new URL(string);
    return url.host === window.location.host;
  };
</script>

<div class="flex grow">
  {#if isFromSameDomain(longURL)}
    <Error error={`😐 This is already a ky link`} action={back} />
  {:else if error === 'invalid url'}
    <Error error={`❌ This is not a valid URL`} action={back} />
  {:else}
    <Error error={`😭 ${error}`} actionName="Retry" actionType="submit" />
  {/if}
</div>

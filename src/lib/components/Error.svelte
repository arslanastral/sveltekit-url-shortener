<script>
  import Button from './Button.svelte';

  export let longURL;
  export let error = '';
  export let back;

  const isFromSameDomain = (string) => {
    let url = new URL(string);
    return url.host === window.location.host;
  };
</script>

<div class="flex grow">
  {#if isFromSameDomain(longURL)}
    <span class="error grow">{`😐 This is already a ky link`}</span><Button
      title="Back"
      onClickFunc={back}
      type="button"
      --font-size="20px"
      --padding="8px 18px"
      --color="white"
      --bg-color="black"
      --border-radius="29px"
    />
  {:else if error === 'invalid url'}
    <span class="error grow">{`❌ This is not a valid URL`}</span><Button
      title="Back"
      onClickFunc={back}
      type="button"
      --font-size="20px"
      --padding="8px 18px"
      --color="white"
      --bg-color="black"
      --border-radius="29px"
    />
  {:else}
    <span class="error grow">{`😭 ${error}`}</span><Button
      title="Retry"
      type="submit"
      --font-size="20px"
      --padding="8px 18px"
      --color="white"
      --bg-color="black"
      --border-radius="29px"
    />
  {/if}
</div>

<style>
  .error {
    font-size: 20px;
    color: red;
    margin-left: 20px;
  }
</style>

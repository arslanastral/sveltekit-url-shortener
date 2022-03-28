<script>
  import Checkmark from '$lib/assets/Checkmark.svelte';
  import Copybutton from './CopyButton.svelte';
  import Button from '../Button.svelte';

  export let shortenedURL = '';
  export let back = null;
</script>

<div class="flex grow">
  <Checkmark />
  <a class="shortened-link fadeIn" href={shortenedURL} target="_blank" rel="noopener noreferrer"
    >{shortenedURL}</a
  >
</div>

<Copybutton />
<Button
  title="Back"
  onClickFunc={back}
  type="button"
  --font-size="20px"
  --padding="8px 28px"
  --color="white"
  --bg-color="black"
  --border-radius="29px"
/>

<style>
  .shortened-link {
    font-size: 20px;
    margin-left: 8px;
    text-decoration: none;
  }

  .shortened-link:hover {
    text-decoration: underline;
  }
</style>

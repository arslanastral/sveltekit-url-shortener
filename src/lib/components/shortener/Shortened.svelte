<script>
  import QRButton from './QRButton.svelte';
  import Checkmark from '$lib/assets/Checkmark.svelte';
  import Copybutton from './CopyButton.svelte';
  import Button from '../Button.svelte';

  export let shortenedURL = '';
  export let back = null;
</script>

<div class="shortened flex grow fadeIn">
  <div class="flex grow">
    <Checkmark />
    <a rel="external" class="shortened-link" href={shortenedURL} target="_blank">{shortenedURL}</a>
  </div>

  <div class="shortened-buttons flex">
    <QRButton {shortenedURL} />
    <Copybutton {shortenedURL} />
    <Button
      title="Back"
      onClickFunc={back}
      type="button"
      --font-size="20px"
      --padding="8px 28px"
      --color="white"
      --bg-color="black"
      --border-radius="29px"
      --transform="none"
    />
  </div>
</div>

<style>
  .shortened-link {
    font-size: 20px;
    margin-left: 8px;
    text-decoration: none;
  }

  .shortened-link:hover {
    text-decoration: underline;
  }

  @media only screen and (max-width: 720px) {
    .shortened {
      flex-direction: column;
      align-content: flex-start;
      justify-content: center;
    }

    .shortened-buttons {
      margin-bottom: 30px;
    }
  }
</style>

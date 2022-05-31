<script>
  import QRButton from './QRButton.svelte';
  import Checkmark from '$lib/assets/Checkmark.svelte';

  import Copybutton from './CopyButton.svelte';
  import Button from '../Button.svelte';
  import LockIcon from '$lib/assets/LockIcon.svelte';

  export let short_url = '';
  export let isSecured = false;
  export let back = null;
</script>

<div class="shortened flex grow fadeIn">
  <div class="flex grow">
    {#if !isSecured}
      <Checkmark />
    {:else}
      <div class="secure-indicator flex">
        <LockIcon width="17" height="17" fill="white" />
      </div>
    {/if}

    <a rel="external" class="shortened-link" href={short_url} target="_blank">{short_url}</a>
  </div>

  <div class="shortened-buttons flex">
    <QRButton {short_url} />
    <Copybutton {short_url} />
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

  .secure-indicator {
    margin-left: 15px;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #8ecc5d;
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

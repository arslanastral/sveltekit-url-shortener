<script>
  import CopyIcon from '$lib/assets/CopyIcon.svelte';
  import { clickToCopy } from '$lib/utils/clickToCopy';

  let text = 'Copy';
</script>

<button
  type="button"
  class="flex"
  use:clickToCopy={'.shortened-link'}
  on:copysuccess={() => (text = 'Copied!')}><CopyIcon /><span>{text}</span></button
>

<style>
  button {
    font-size: 20px;
    padding: 8px 18px;
    color: black;
    background-color: white;
    border-radius: 29px;
    border: 1px solid #808080;
    margin: 6px;
    cursor: pointer;
    transition: transform ease-in 0.1s;
  }

  button:active {
    transform: scale(0.9);
  }

  span {
    margin-left: 3px;
  }
</style>

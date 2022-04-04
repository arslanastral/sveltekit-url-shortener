<script>
  import CopyIcon from '$lib/assets/CopyIcon.svelte';
  import { clickToCopy } from '$lib/utils/clickToCopy';

  export let shortenedURL;
  let text = 'Copy';
</script>

<button
  type="button"
  class="flex"
  on:click={(e) => clickToCopy(e, shortenedURL)}
  on:copysuccess={() => (text = 'Copied!')}><CopyIcon /><span>{text}</span></button
>

<style>
  button {
    font-size: 20px;
    padding: 8px 18px;
    color: black;
    background-color: white;
    border-radius: 29px;
    border: 1px solid #dfe1e5;
    margin: 6px;
    cursor: pointer;
    transition: border ease-in 0.1s, background-color ease-in 0.1s;
  }

  button:hover {
    border: 1px solid #808080;
  }

  button:active {
    background-color: rgb(247, 247, 247);
  }

  span {
    margin-left: 3px;
  }
</style>

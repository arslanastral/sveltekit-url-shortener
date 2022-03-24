<script>
  import { clickToCopy } from '$lib/utils/clickToCopy';

  let text = 'Copy';
</script>

<button use:clickToCopy={'.shortened-link'} on:copysuccess={() => (text = 'Copied!')}>{text}</button
>

<style>
  button {
    font-size: 20px;
    padding: 8px 25px;
    color: black;
    background-color: white;
    border-radius: 29px;
    border: 1px solid #808080;
    margin: 6px;
    transition: transform ease-in 0.1s;
  }

  button:active {
    transform: scale(0.9);
  }
</style>

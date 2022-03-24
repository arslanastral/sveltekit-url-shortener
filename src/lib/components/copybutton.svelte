<script>
  import { clickToCopy } from '$lib/utils/clickToCopy';
</script>

<button use:clickToCopy={'.shortened-link'}>Copy</button>

<style>
  button {
    font-size: 20px;
    padding: 8px 25px;
    color: black;
    background-color: white;
    border-radius: 29px;
    border: 1px solid #808080;
    margin: 6px;

    transition: transform ease-in 0.1s, box-shadow ease-in 0.1s;
  }

  button:active {
    transform: scale(0.9);
  }

  button:hover {
    box-shadow: 0 2px 10px rgba(129, 129, 129, 0.3);
  }
</style>

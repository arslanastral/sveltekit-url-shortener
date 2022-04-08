<script>
  import DownIcon from '$lib/assets/DownIcon.svelte';

  export let name;
</script>

<div class="flex">
  <div class="user-name">Hey, {name}</div>
  <button><DownIcon /></button>
</div>

<style>
  .user-name {
    font-size: 20px;
    letter-spacing: -0.045em;
  }

  button {
    margin-left: 10px;
    padding: 0;
    border: none;
    transition: transform ease-out 0.1s;
  }

  button:active {
    transform: scale(0.9);
  }
</style>

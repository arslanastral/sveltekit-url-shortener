<script>
  export let isToggled = false;

  const toggle = () => {
    isToggled = !isToggled;
  };
</script>

<div class="container">
  <button on:click={toggle} class="control-button">Filter</button>

  {#if isToggled}
    <div class="flex menu fadeIn" />
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .control-button {
    border: none;
    color: black;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 8px 15px;
    cursor: pointer;
    position: relative;
  }

  .menu {
    gap: 10px;
    position: absolute;
    min-width: 150px;
    top: 50px;
    right: 0px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    z-index: 3;
  }
</style>

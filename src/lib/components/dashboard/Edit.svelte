<script>
  export let toggleClose;
  export let short_url;
</script>

<div class="fadeIn flex overlay">
  <div use:clickOutside on:click_outside={toggleClose} class="edit-container flex center">
    <button on:click={toggleClose} type="button" class="flex center close" aria-label="close-edit"
      >X</button
    >
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(23, 24, 24, 0.97);
    justify-content: center;
  }

  .edit-container {
    animation: fadeIn 0.5s;
    position: absolute;
    text-align: center;
    width: 600px;
    height: 400px;
    border: 2px solid blue;
    border-radius: 9px;
    background-color: white;
    color: black;
    flex-direction: column;
  }

  .center {
    justify-content: space-evenly;
  }

  .close {
    font-weight: bold;
    position: absolute;
    top: -15px;
    right: -15px;
    background-color: blue;
    color: white;
    padding: 10px;
    border-radius: 50%;
    border: none;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
  }
</style>

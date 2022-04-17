<script>
  import CloseIcon from '$lib/assets/CloseIcon.svelte';
  export let toggleEditClose;
  export let short_url;
</script>

<div class="fadeIn flex overlay">
  <div class="edit-container  flex">
    <div class="flex control-bar">
      <button on:click={toggleEditClose} type="button" class="close" aria-label="close-edit"
        ><CloseIcon width="30" height="30" /></button
      >
    </div>
    <div class="flex info-bar">
      <span class="title">Editing</span> <span class="title-url">{short_url}</span>
    </div>
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
    width: clamp(430px, 70vw, 800px);
    height: 400px;
    border-radius: 9px;
    background-color: white;
    color: black;
    flex-direction: column;
    align-items: flex-start;
  }

  .control-bar {
    width: 95%;
    margin: 0 auto;
    /* height: 25px; */
    border-bottom: 1px solid black;
    justify-content: flex-end;
  }

  .center {
    justify-content: space-evenly;
  }

  .close {
    border: none;
    padding: 10px 0;
    cursor: pointer;
  }

  .info-bar {
    width: 95%;
    margin: 0 auto;

    justify-content: space-between;
  }

  .title {
    font-weight: 500;
    font-size: 37px;
    color: #000000;
    letter-spacing: -0.035em;
  }

  .title-url {
    font-size: 25px;
    color: #2602ff;
    letter-spacing: -0.035em;
  }
</style>

<script>
  import CloseIcon from '$lib/assets/CloseIcon.svelte';
  import TagIcon from '$lib/assets/TagIcon.svelte';
  import Button from '../Button.svelte';
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
      <span class="title">Editing</span>
      <a target="_blank" href={short_url} class="title-url">{short_url}</a>
    </div>
    <div class="flex tag-container">
      <span class="tag-title">TAGS</span>
      <div class="flex tag-input">
        <div class="flex inputs-wrapper">
          <div class="flex input-box">
            <TagIcon />
            <input type="text" placeholder="Add a tag" />
          </div>

          <div class="flex circles">
            <span class="yellow" />
            <span class="blue" />
            <span class="green" />
            <span class="red" />
          </div>
        </div>
        <Button
          title="ADD"
          type="button"
          --font-size="20px"
          --padding="8px 18px"
          --color="white"
          --bg-color="#3E5DFF"
          --border-radius="29px"
        />
      </div>
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
    text-decoration: none;
    font-size: 25px;
    color: #2602ff;
    letter-spacing: -0.035em;
  }

  .title-url:hover {
    text-decoration: underline;
  }

  .tag-container {
    width: 55%;
    flex-direction: column;
    align-items: flex-start;
    margin: 30px auto 0 22px;
  }

  .tag-title {
    font-weight: 600;
    font-size: 19px;
    letter-spacing: -0.035em;
    margin-bottom: 5px;
    color: #404040;
  }

  .tag-input {
    background: white;
    color: black;
    border: 1px solid rgb(104, 104, 104);
    border-radius: 20px;
    justify-content: space-between;
  }

  input {
    width: 100%;
    font-size: 20px;
    background: none;
    border: 0;
  }

  input:focus {
    outline: none;
    border: 0;
  }

  .circles {
    justify-content: space-evenly;
  }

  .circles * {
    width: 27px;
    height: 27px;
    border-radius: 50%;
    margin: 5px;
  }

  .yellow {
    background: #eaffad;
  }

  .blue {
    background: #81caff;
  }

  .green {
    background: #ff9a6f;
  }

  .red {
    background: #81ffbb;
  }
</style>

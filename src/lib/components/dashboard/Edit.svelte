<script>
  import Button from '../Button.svelte';
  import CloseIcon from '$lib/assets/CloseIcon.svelte';
  import AddTag from './AddTag.svelte';
  import Links from '$lib/stores/LinkStore';
  import LoadingIcon from '$lib/assets/LoadingIcon.svelte';

  export let toggleEditClose;
  export let short_url;
  export let shortId;
  export let tags;

  let loading = false;

  async function handleEdit() {
    loading = true;
    const res = await fetch('/api/user/tags', {
      method: 'PATCH',
      body: JSON.stringify({
        short_url: shortId,
        tags
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let json = await res.json();
    const links = await fetch('/api/user/links');
    let newLinks = await links.json();

    console.log(json);
    if (res.ok && links.ok) {
      console.log('newlinks:', newLinks);
      $Links = newLinks;
      loading = false;
      toggleEditClose();
    } else {
      loading = false;
      console.log(json.error);
    }
  }

  const setTags = (newtags) => {
    tags = newtags;
  };
</script>

<div class="fadeIn flex overlay">
  <div class="edit-container  flex">
    <div class:loading class="flex control-bar">
      {#if loading}
        <LoadingIcon style="margin-left: 0" width="50px" height="50px" />
      {/if}

      <button on:click={toggleEditClose} type="button" class="close" aria-label="close-edit"
        ><CloseIcon width="30" height="30" /></button
      >
    </div>
    <div class="flex info-bar">
      <span class="title">Edit</span>
      <a target="_blank" href={short_url} class="title-url">{short_url}</a>
    </div>
    <AddTag {setTags} {tags} />

    <div class="flex action-button">
      <Button
        title={'Discard'}
        onClickFunc={toggleEditClose}
        type="button"
        --font-size="20px"
        --color="white"
        --padding="8px 20px"
        --bg-color="black"
        --border-radius="50px"
      />
      <Button
        title={'Save'}
        onClickFunc={handleEdit}
        type="button"
        --font-size="20px"
        --color="black"
        --padding="8px 25px"
        --bg-color="#E5EA12"
        --border-radius="50px"
      />
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
    border-bottom: 1px solid black;
    justify-content: flex-end;
  }

  .loading {
    justify-content: space-between;
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

  .action-button {
    width: 95%;
    margin: 15px auto;
    justify-content: flex-end;
    height: 200px;
    align-items: flex-end;
  }
</style>

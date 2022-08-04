<script>
  export let isToggled = false;
  let isSelected = '';
  let sortDirection = '';
</script>

<div class="container">
  <button on:click={() => (isToggled = !isToggled)} class="control-button">Sort By</button>

  {#if isToggled}
    <div class="menu">
      <div class="type flex">
        <button
          on:click={() => (isSelected = 'date')}
          class:active={isSelected === 'date'}
          class="title">Date</button
        >
        <div class="direction">
          <button
            on:click={() => (sortDirection = 'up')}
            class:direction-active={sortDirection === 'up'}>↑</button
          >
          <button
            on:click={() => (sortDirection = 'down')}
            class:direction-active={sortDirection === 'down'}>↓</button
          >
        </div>
      </div>
      <div class="type flex">
        <button
          on:click={() => (isSelected = 'count')}
          class:active={isSelected === 'count'}
          class="title">Count</button
        >
        <div class="direction">
          <button
            on:click={() => (sortDirection = 'up')}
            class:direction-active={sortDirection === 'up'}>↑</button
          >
          <button
            on:click={() => (sortDirection = 'down')}
            class:direction-active={sortDirection === 'down'}>↓</button
          >
        </div>
      </div>
    </div>
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
    border: 1px solid grey;
    border-radius: 10px;
    padding: 8px 15px;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
  }

  .menu {
    position: absolute;
    min-width: 150px;
    top: 50px;
    right: 0px;
    background: #333;
    /* box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28); */
    border-radius: 10px;
    padding: 10px;
  }

  button {
    border: none;
    cursor: pointer;
  }

  .type {
    justify-content: space-between;
  }

  .title {
    color: white;
    padding: 4px 10px;
  }

  .title:hover {
    color: #333;
    background-color: yellow;
    border-radius: 20px;
  }

  .direction {
    display: flex;
    color: white;
  }

  .direction button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .direction button:hover {
    color: yellow;
    background-color: rgb(85, 85, 85);
  }

  .active {
    color: #333;
    background-color: yellow;
    border-radius: 20px;
  }

  .direction-active {
    color: yellow;
    background-color: rgb(85, 85, 85);
  }
</style>

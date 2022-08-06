<script>
  export let setSortDirection;
  export let sortDirection;
</script>

<div class="direction">
  <button on:click={() => setSortDirection('asc')} class:direction-active={sortDirection === 'asc'}
    >↑</button
  >
  <button
    on:click={() => setSortDirection('desc')}
    class:direction-active={sortDirection === 'desc'}>↓</button
  >
</div>

<style>
  button {
    border: none;
    cursor: pointer;
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

  .direction-active {
    color: yellow;
    background-color: rgb(85, 85, 85);
  }
</style>

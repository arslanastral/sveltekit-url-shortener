<script>
  export let setSortDirection;
  export let sortDirection;
</script>

<div class="flex direction">
  <button on:click={() => setSortDirection('asc')} class:direction-active={sortDirection === 'asc'}
    >↑</button
  >
  <button
    on:click={() => setSortDirection('desc')}
    class:direction-active={sortDirection === 'desc'}>↓</button
  >
</div>

<style>
  .direction {
    gap: 8px;
  }

  button {
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgb(238, 238, 238);
    color: blue;
  }

  .direction-active {
    color: white;
    background-color: blue;
  }
</style>

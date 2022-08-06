<script>
  export let title = '';
  export let sort = '';
  export let setSort;
  export let sortValue = '';
</script>

<div class="type flex">
  <button
    on:click={() => setSort(sortValue)}
    class:active={sortValue === sort || sort === `-${sortValue}`}
    class="title">{title}</button
  >
</div>

<style>
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

  .active {
    color: #333;
    background-color: yellow;
    border-radius: 20px;
  }
</style>

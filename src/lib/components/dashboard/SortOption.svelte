<script>
  export let title = '';
  export let sort = '';
  export let setSort;
  export let sortValue = '';

  const handleSortValue = (value) => {
    if (value === sort || sort === `-${value}`) {
      return;
    }
    setSort(value);
  };
</script>

<div class="type flex">
  <button
    on:click={() => handleSortValue(sortValue)}
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
    color: blue;
    background: rgb(238, 238, 238);
    padding: 4px 10px;
    border-radius: 20px;
  }

  .active {
    color: white;
    background-color: blue;
  }
</style>

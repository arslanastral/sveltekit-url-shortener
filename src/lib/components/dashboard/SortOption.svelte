<script>
  export let title = '';
  export let isActive = false;
  export let currentSort = '';
  export let sortDirection = 'down';

  const handleSort = (sort) => {
    if (currentSort === sort) {
      sortDirection = sortDirection === 'down' ? 'up' : 'down';
    } else {
      sortDirection = 'down';
    }
    currentSort = sort;
  };

  const handleSortDirection = (direction) => {
    if (currentSort === title) {
      sortDirection = direction;
    }
  };
</script>

<div class="type flex">
  <button on:click={handleSort} class:active={isActive === true} class="title">{title}</button>
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

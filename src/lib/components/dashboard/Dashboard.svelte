<script>
  import LinksIcon from '$lib/assets/LinksIcon.svelte';
  import LoadingIcon from '$lib/assets/LoadingIcon.svelte';
  import Links from '$lib/stores/LinkStore';
  import Stats from '../stats/Stats.svelte';
  import DashboardLink from './DashboardLink.svelte';
  import Filter from './Filter.svelte';
  import Sort from './Sort.svelte';
  import SortDirection from './SortDirection.svelte';
  export let links;
  export let error;
  export let stats;

  let currentPage = 1;
  let paginationError = '';
  let sort = 'date';
  let sortDirection = 'desc';
  let currentSort = 'date';
  let paginationLoading = false;

  const handlePagination = async () => {
    if (paginationLoading || paginationError) {
      return;
    }
    paginationLoading = true;
    const paginateLinks = await fetch(`/api/user/links?page=${currentPage}sort=${currentSort}`);

    if (paginateLinks.ok) {
      const paginated = await paginateLinks.json();
      $Links = [...$Links, ...paginated];
      setTimeout(() => {
        paginationLoading = false;
        if (paginated.length === 0) {
          paginationError = 'No more links to show';
        }
      }, 1000);

      currentPage++;
    } else {
      paginationError = paginateLinks.error;
      paginationLoading = false;
    }
  };

  const sortMap = {
    date: {
      asc: '-date',
      desc: 'date'
    },
    clicks: {
      asc: '-clicks',
      desc: 'clicks'
    }
  };

  const setSort = (sortBy) => {
    sort = sortBy;
    currentSort = sortMap[sort][sortDirection];
    currentPage = 1;
    $Links = [];
    handlePagination();
  };

  const setSortDirection = (direction) => {
    sortDirection = direction;
    currentSort = sortMap[sort][sortDirection];
    currentPage = 1;
    $Links = [];
    handlePagination();
  };
</script>

<div class="flex container">
  <div class="main-title">Dashboard</div>

  <div class="flex stats">
    <Stats {...stats} />
  </div>

  <div class="links-container">
    <div class="controls flex">
      <div class="title flex">
        <LinksIcon />
        <div class="title">Your Links</div>
      </div>

      <div class="flex control-buttons">
        <SortDirection {sortDirection} {setSortDirection} />
        <Sort {setSort} {sort} />
        <Filter />
      </div>
    </div>
    <div class="grow links-wrapper">
      {#if error}
        <div>{error}</div>
      {/if}

      {#if links.length}
        {#each links as link, i}
          <DashboardLink index={i + 1} {...link} />
        {/each}
      {:else}
        <div class="no-links">
          You haven't shortned any links yet. When you do they will show here.
        </div>
      {/if}
    </div>
  </div>
  {#if paginationLoading}
    <LoadingIcon />
  {/if}
  {#if paginationError}
    <div class="no-links">{paginationError}</div>
  {/if}
  {#if links.length >= 10 && !paginationLoading && !paginationError}
    <button class="load-more fadeIn" on:click={handlePagination}> Load More </button>
  {/if}
</div>

<style>
  .container {
    width: 80%;
    margin-top: 20px;
    flex-direction: column;
  }

  .main-title {
    width: 100%;
    font-size: 35px;
    font-weight: bold;
    margin: 10px 0;
  }

  .links-container {
    width: 100%;
    margin-top: 50px;
  }

  .controls {
    justify-content: space-between;
  }

  .control-buttons {
    gap: 10px;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    margin: 10px 0;
  }

  .stats {
    margin-top: 10px;
    width: 100%;
  }

  .links-wrapper {
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    overflow: hidden;
  }

  .no-links {
    font-size: 20px;
    color: #636363;
    margin: 20px;
  }

  .load-more {
    border: none;
    background: blue;
    color: #ffffff;
    border-radius: 40px;
    padding: 10px 20px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: transform ease-out 0.1s;
  }

  .load-more:active {
    transform: scale(0.95);
  }
</style>

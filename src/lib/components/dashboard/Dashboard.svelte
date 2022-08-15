<script>
  import LinksIcon from '$lib/assets/LinksIcon.svelte';
  import LoadingIcon from '$lib/assets/LoadingIcon.svelte';
  import Links from '$lib/stores/LinkStore';
  import Stats from '../stats/Stats.svelte';
  import DashboardLink from './DashboardLink.svelte';
  import Filter from './Filter.svelte';
  import Sort from './Sort.svelte';
  import SortDirection from './SortDirection.svelte';
  import { TagFilter } from '$lib/stores/FilterStore';
  import SearchIcon from '$lib/assets/SearchIcon.svelte';
  export let links;
  export let error;
  export let stats;

  let currentPage = 1;
  let paginationError = '';
  let sort = 'date';
  let sortDirection = 'desc';
  let currentSort = 'date';
  let paginationLoading = false;
  let tags = $TagFilter.join();
  let tagFilter = $TagFilter.length ? '&tags=' + tags : '';
  let searchQuery = '';
  $: search = searchQuery.length ? '&s=' + searchQuery : '';

  const handlePagination = async () => {
    if (paginationLoading || paginationError) {
      return;
    }

    paginationLoading = true;
    const paginateLinks = await fetch(
      `/api/user/links?page=${currentPage}&sort=${currentSort}${tagFilter}${search}`
    );

    if (paginateLinks.ok) {
      const paginated = await paginateLinks.json();

      if (currentPage === 0) {
        $Links = [...paginated];
      } else {
        $Links = [...$Links, ...paginated];
      }

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
      desc: '-date',
      asc: 'date'
    },
    clicks: {
      desc: '-clicks',
      asc: 'clicks'
    }
  };

  const setSort = (sortBy) => {
    if (paginationLoading || paginationError) {
      return;
    }
    sort = sortBy;
    currentPage = 0;
    currentSort = sortMap[sort][sortDirection];

    handlePagination();
  };

  const setSortDirection = (direction) => {
    if (paginationLoading || paginationError) {
      return;
    }
    sortDirection = direction;
    currentPage = 0;
    currentSort = sortMap[sort][sortDirection];

    handlePagination();
  };

  const setTagsFilter = () => {
    if (paginationLoading || paginationError) {
      return;
    }
    tags = $TagFilter.join();
    tagFilter = $TagFilter.length ? '&tags=' + tags : '';
    currentPage = 0;
    handlePagination();
  };

  const handleSearchQuery = () => {
    console.log(searchQuery);
    if (paginationLoading || paginationError) {
      return;
    }
    currentPage = 0;
    handlePagination();
  };

  const handleSearchPress = (e) => {
    if (e.code === 'Enter') {
      handleSearchQuery();
    }
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

      {#if links.length}
        <div class="flex control-buttons">
          <div class="search flex grow-2">
            <input
              bind:value={searchQuery}
              placeholder="Search"
              type="text"
              on:keypress={(e) => handleSearchPress(e)}
            />
            <button class="search-button flex" on:click={handleSearchQuery}>
              <SearchIcon fill="blue" />
            </button>
          </div>
          <SortDirection {sortDirection} {setSortDirection} />
          <div class="flex sort-control">
            <Sort {setSort} {sort} />
            <Filter setTags={setTagsFilter} />
          </div>
        </div>
      {/if}
    </div>
    <div class="grow links-wrapper">
      {#if paginationLoading}
        <div class="overlay" />
      {/if}

      {#if error}
        <div>{error}</div>
      {/if}

      {#if links.length}
        {#each links as link, i}
          <DashboardLink index={i + 1} {...link} setTags={setTagsFilter} />
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
  input {
    font-size: 16px;
    margin-left: 5px;
    background: none;
    border: 0;
    width: 100%;
    height: 40px;
  }

  input:focus {
    outline: none;
    border: 0;
  }

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

  .search {
    border: 1px solid #eee;
    border-radius: 40px;
    font-weight: 400;
  }

  .search:focus {
    border: 1px solid #ccc;
  }

  .search-button {
    margin: 0 6px;
    border: 0;
    background: #eee;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: transform ease-in 0.1s;
  }

  .search-button:active {
    transform: scale(0.9);
  }

  .links-container {
    width: 100%;
    margin-top: 50px;
  }

  .controls {
    justify-content: space-between;
  }

  .control-buttons {
    gap: 20px;
    align-content: center;
  }

  .sort-control {
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
    position: relative;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    overflow: hidden;
  }

  .overlay {
    background: rgba(255, 255, 255, 0.75);
    position: absolute;
    width: 100%;
    height: 100%;
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

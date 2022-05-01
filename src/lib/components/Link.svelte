<script>
  import { page } from '$app/stores';

  import LockIcon from '$lib/assets/LockIcon.svelte';
  import Tag from './dashboard/Tag.svelte';

  export let tags;
  export let short_url;
  export let long_url;
  export let secured;

  let shortLink = `${$page.url.origin}/${short_url}`;
</script>

<div class="link">
  <div class="long-link">
    <img src={`https://www.google.com/s2/favicons?domain=${long_url}`} alt="favicon" />{long_url}
  </div>

  <div class="flex">
    <a rel="external" href={shortLink} target="_blank" class="short-link">{shortLink}</a>
    {#if secured}
      <LockIcon width="18" height="18" fill="green" />
    {/if}
  </div>

  {#if tags && tags.length}
    <div class="flex tags">
      {#each tags as tag}
        <Tag tag={tag.name} --bg-color={tag.color} --color={'black'} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .link {
    margin: var(--margin);
    display: flex;
    flex-direction: column;
  }

  img {
    margin-right: 10px;
  }

  .long-link {
    font-size: 17px;
    color: #636363;
    display: inline-block;
    width: var(--width);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .short-link {
    margin-right: 6px;
    text-decoration: none;
    color: black;
    font-weight: 500;
    font-size: 19px;
  }

  .short-link:hover {
    text-decoration: underline;
  }

  .tags {
    flex-wrap: wrap;
  }
</style>

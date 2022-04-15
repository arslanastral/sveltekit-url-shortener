<script>
  export let index;
  export let shortLink;
  export let longLink;
  export let date;
  export let clicks;
</script>

<div class="flex link-container">
  <span class="index">{index}</span>
  <div class="link">
    <div class="long-link">
      {longLink}
    </div>
    <div class="short-link">{shortLink}</div>
  </div>
  <div class="date">{date}</div>
  <span class="clicks">{clicks}</span>
</div>

<style>
  .link-container {
    width: 100%;
    border-bottom: 1px solid #eaeaea;
  }

  .index {
    margin: 20px;
    font-weight: 500;
    font-size: 19px;
  }

  .link {
    margin: 20px;
  }

  .long-link {
    font-size: 17px;
    color: #636363;
    display: inline-block;
    width: clamp(200px, 40vw, 900px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .short-link {
    line-height: 15px;
    font-weight: 500;
    font-size: 19px;
  }

  .date {
    margin: 40px;
    font-size: 17px;
    color: #555555;
  }

  .clicks {
    margin: 20px;
    font-size: 19px;
  }
</style>

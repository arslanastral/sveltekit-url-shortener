<script>
  import LinkButton from './LinkButton.svelte';
</script>

<div class="linkbox flex grow">
  <div class="link-time">2m ago</div>
  <div class="flex link grow-2">
    <span class="long-link"
      >https://www.figma.com/file/thO6SBVgzmiNV8SBhpBdaN/Untitled?node-id=2%3A3</span
    >
    <a
      class="short-link"
      href="http://localhost:3000/rpPt"
      target="_blank"
      rel="noopener noreferrer">http://localhost:3000/rpPt</a
    >
  </div>
  <!-- <div class="link-type">Secure</div> -->
  <div class="flex button-container"><LinkButton /></div>
</div>

<style>
  .linkbox {
    width: 100%;
    height: 75px;
    color: black;
    justify-content: space-between;
    border-bottom: 1px solid #dfe1e5;
  }

  .link-time {
    margin: 0 20px;
    font-size: 14px;
    color: #9c9c9c;
  }

  .link {
    flex-direction: column;
    align-items: flex-start;
  }

  .long-link {
    color: #636363;
    display: inline-block;
    width: clamp(200px, 30vw, 400px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .short-link {
    color: black;
    text-decoration: none;
  }

  .short-link:hover {
    text-decoration: underline;
  }

  /* .link-type {
    padding: 1px 10px;
    margin: 0px 20px;
    border-radius: 20px;
    border: 1px solid blue;
    font-size: 15px;
  } */

  .button-container {
    margin-right: 20px;
    height: 48%;
    border-radius: 5px;
    border: 1px solid #dfe1e5;
  }
</style>

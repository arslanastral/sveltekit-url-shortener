<script>
  export let clicks = '0';
  export let title = 'Clicks Today';
</script>

<div class="container flex">
  <div class="count">{clicks}</div>
  <div class="title">{title}</div>
</div>

<style>
  .container {
    width: 120px;
    height: 120px;
    background-color: #00bf41;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .count {
    width: 100%;
    color: #ffd977;
    font-size: 52px;
  }
</style>

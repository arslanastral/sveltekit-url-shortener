<script>
  export let clicks = '0';
  export let title = 'Today';
</script>

<div class="container flex">
  <div class="count">{clicks}</div>
  <div class="title flex">
    <span>Clicks</span>
    {title}
  </div>
</div>

<style>
  .container {
    width: 120px;
    height: 120px;
    background-color: #00bf41;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-radius: 14px;
  }

  .count {
    margin: 0px 0 5px 13px;
    width: 100%;
    color: #ffd977;
    font-size: 52px;
    line-height: 50px;
    letter-spacing: -0.075em;
  }

  .title {
    margin-left: 13px;
    color: #ffffff;
    line-height: 19px;
    font-size: 16px;
    letter-spacing: -0.035em;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
</style>

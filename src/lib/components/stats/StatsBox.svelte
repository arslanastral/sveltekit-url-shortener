<script>
  export let count = Math.floor(Math.random() * 200);
  export let countType;
</script>

<div class="flex stats-box">
  <div class="flex info grow">
    <div class="flex info-wrapper">
      <span class="count">{count}</span><span class="count-type">{countType}</span>
    </div>
  </div>
  <div class="grow"><slot name="icon" /></div>
</div>

<style>
  .stats-box {
    width: 210px;
    height: 140px;
    background: #ffffff;
    border: 1px solid #dfe1e5;
    border-radius: 19px;
  }

  .info {
    flex-direction: column;
    align-items: center;
  }

  .count {
    font-weight: 500;
    font-size: 59px;
    line-height: 55px;
    letter-spacing: -0.045em;

    color: var(--count-color);
  }

  .info-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
</style>

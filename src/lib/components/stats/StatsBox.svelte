<script>
  export let count;
  export let countType;
</script>

<div class="flex stats-box">
  <div class="flex info grow">
    <div class="flex info-wrapper">
      <span class="count">{count}</span><span class="count-type">{countType}</span>
    </div>
  </div>
  <div class="icon flex grow"><slot name="icon" /></div>
</div>

<style>
  .stats-box {
    width: 200px;
    height: 130px;
    background: #ffffff;
    border: 1px solid #dfe1e5;
    border-radius: 19px;
    transition: box-shadow ease-out 0.2s;
  }

  .stats-box:hover {
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }

  .info {
    flex-direction: column;
    margin-left: 10px;
  }

  .count {
    font-weight: 500;
    font-size: 59px;
    line-height: 52px;
    letter-spacing: -0.045em;

    color: var(--count-color);
  }

  .info-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .icon {
    justify-content: space-around;
    margin-right: 8px;
  }

  .count-type {
    margin-left: 6px;
  }
</style>

<script>
  export let name = 'Data Name';
  export let data = 'No Data';
</script>

<div class="container flex">
  <span class="icon"><slot name="icon" /></span>
  <div class="data">{data}</div>
  <div class="name">{name}</div>
</div>

<style>
  .container {
    width: 206px;
    height: 120px;
    background-color: white;
    border: 1px solid #cdcdcd;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-radius: 14px;
  }

  .icon {
    margin-left: 12px;
    width: 100%;
  }

  .data {
    margin: 5px 0 2px 12px;
    width: 100%;
    font-size: 24px;
    letter-spacing: -0.045em;
    color: #6d6d6d;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .name {
    margin-left: 12px;
    width: 100%;
    font-weight: 600;
    font-size: 21px;
    letter-spacing: -0.045em;
    color: #000000;
  }
</style>

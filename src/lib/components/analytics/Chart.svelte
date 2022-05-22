<div class="chart-container flex">
  <div class="chart-title">Click Activity</div>
  <div class="chart">
    <svg class="chart-svg">
      <g class="x-axis" />
      <g class="y-axis" />
    </svg>
  </div>
</div>

<style>
  .chart-container {
    background: #ffffff;
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    min-height: 550px;
    width: 60%;
    flex-direction: column;
  }

  .chart-title {
    margin: 20px;
    align-self: flex-start;
    font-weight: 500;
    font-size: 26px;
    letter-spacing: -0.045em;
    color: #000000;
  }

  .chart {
    width: clamp(200px, 45vw, 800px);
    height: 400px;
    margin-top: 20px;
  }
</style>

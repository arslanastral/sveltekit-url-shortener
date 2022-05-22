<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data = [];

  let chart;
  const dimensions = {
    width: 700,
    height: 400
  };

  onMount(() => {
    if (data.length) {
      const svg = d3.select(chart);

      const xScale = d3
        .scaleBand()
        .domain([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
        ])
        .range([0, dimensions.width])
        .padding(0.4);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data.map((d) => d.count)) + 5])
        .range([dimensions.height, 0])
        .nice();

      const xAxis = d3
        .axisBottom(xScale)

        .tickValues(
          xScale.domain().filter(function (d, i) {
            const MIN_WIDTH = 70;
            let skip = Math.round((MIN_WIDTH * data.length) / dimensions.width);
            skip = Math.max(2, skip);
            return !(i % skip);
          })
        )
        .tickPadding(20);
      svg
        .select('.x-axis')
        .style('transform', `translate(50px,${dimensions.height}px)`)
        .attr('font-family', 'Inter')
        .attr('font-size', '1rem')
        .attr('color', '#615b5b')
        .transition()
        .duration(300)
        .call(xAxis);

      svg.select('.x-axis').select('path').remove();

      const yAxis = d3
        .axisLeft(yScale)
        .ticks(8)

        .tickSize(-dimensions.width - 50);
      svg
        .select('.y-axis')
        .attr('font-family', 'Inter')
        .attr('font-size', '0.9rem')
        .attr('color', '#615b5b')
        .call(yAxis)
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .selectAll('.tick:not(:first-of-type) line')
            .attr('stroke-opacity', 0.5)
            .attr('stroke-dasharray', '2,2')
        )
        .call((g) => g.selectAll('.tick text').attr('x', 35).attr('dy', -7));

      svg
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .style('transform', 'scale(1,-1)')
        .attr('rx', 1)
        .attr('x', (value) => xScale(value.hour) + 50)
        .attr('y', -dimensions.height)
        .attr('width', xScale.bandwidth())
        .on('mouseover', function (event, d) {
          d3.select(this).attr('fill', 'greenyellow');
        })
        .on('mouseout', function () {
          d3.select(this).attr('fill', 'blue');
        })
        .transition()
        .attr('height', (value) => dimensions.height - yScale(value.count))
        .attr('fill', 'blue');
    }
  });
</script>

<div class="chart-container flex">
  <div class="chart-title">Click Activity</div>
  <div class="chart">
    <svg class="chart-svg" bind:this={chart}>
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

  .chart-svg {
    width: 100%;
    height: 100%;
    overflow: visible !important;
  }
</style>

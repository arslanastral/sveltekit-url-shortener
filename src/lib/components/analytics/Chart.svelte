<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { page } from '$app/stores';

  export let data = [];

  let chart;
  const dimensions = {
    width: 700,
    height: 370
  };

  onMount(() => {
    let timeFormat = {
      '/analytics': '%I:%M %p',
      '/analytics/weekly': '%A',
      '/analytics/all': '%x'
    };

    if (data.length) {
      let minDate = d3.min(data, (d) => new Date(d.date).setMinutes(0, 0, 0));
      let maxDate = d3.max(data, (d) => new Date(d.date).setMinutes(0, 0, 0));

      let min = d3.timeDay.floor(new Date(minDate));
      let max = d3.timeDay.ceil(new Date(maxDate));

      let minDay = d3.timeDay.floor(new Date(new Date().setDate(new Date().getDate() - 6)));

      const domain = {
        '/analytics': d3.timeHour.range(min, max, 1).map((d) => d.toString()),
        '/analytics/weekly': d3.timeDay.range(minDay, max, 1).map((d) => d.toString()),
        '/analytics/all': d3.timeDay.range(minDay, max, 1).map((d) => d.toString())
      };

      const svg = d3.select(chart);

      const xScale = d3
        .scaleBand()
        .domain(domain[$page.url.pathname])
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
            const MIN_WIDTH = 60;
            let skip = Math.round((MIN_WIDTH * data.length) / dimensions.width);
            skip = Math.max(3, skip);
            return !(i % skip);
          })
        )
        .tickPadding(20)
        .tickFormat((t) => {
          const date = new Date(t);
          date.setMinutes(0, 0, 0);
          const formatTime = d3.timeFormat(timeFormat[$page.url.pathname]);
          return formatTime(date);
        });

      svg
        .select('.x-axis')
        .style('transform', `translate(50px,${dimensions.height}px)`)
        .style('font-family', 'Inter')
        .style('font-size', '0.9rem')
        .attr('color', '#808385')
        .transition()
        .duration(300)
        .call(xAxis)
        .call((g) => g.selectAll('.tick line').attr('color', '#e8ebed'));

      svg.select('.x-axis').select('path').remove();

      const yAxis = d3
        .axisLeft(yScale)
        .ticks(8)

        .tickSize(-dimensions.width - 50);
      svg
        .select('.y-axis')
        .style('font-family', 'Inter')
        .style('font-size', '0.9rem')
        .attr('color', '#808385')
        .call(yAxis)
        .call((g) => g.select('.domain').remove())
        .call((g) =>
          g
            .selectAll('.tick:not(:first-of-type) line')
            .attr('stroke-opacity', 0.5)
            .attr('stroke-dasharray', '2,2')
            .attr('color', '#b5b5b5')
        )
        .call((g) =>
          g
            .selectAll('.tick:first-of-type line')
            // .attr('stroke-opacity', 0.5)
            // .attr('stroke-dasharray', '2,2')
            .attr('color', '#e8ebed')
        )
        .call((g) => g.selectAll('.tick text').attr('x', 10).attr('dy', -7));

      svg
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .style('transform', 'scale(1,-1)')
        .attr('rx', 1)
        .attr('x', (value) => {
          let xDate = {
            '/analytics': new Date(new Date(value.date).setMinutes(0, 0, 0)).toString(),
            '/analytics/weekly': new Date(new Date(value.date).setHours(0, 0, 0, 0)).toString(),
            '/analytics/all': new Date(new Date(value.date).setHours(0, 0, 0, 0)).toString()
          };

          // console.log(new Date(new Date(value.date).setMinutes(0, 0, 0)).toString());
          return xScale(xDate[$page.url.pathname]) + 50;
        })
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
  {#if data.length}
    <div class="chart">
      <svg class="chart-svg" bind:this={chart}>
        <g class="x-axis" />
        <g class="y-axis" />
      </svg>
    </div>
  {:else}
    <span class="no-data">There is as yet insufficient data for a meaningful chart</span>
  {/if}
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

  .no-data {
    margin-top: 160px;
    font-size: 1.2rem;
    font-family: Inter;
    color: #808385;
    text-align: center;
    padding: 20px;
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

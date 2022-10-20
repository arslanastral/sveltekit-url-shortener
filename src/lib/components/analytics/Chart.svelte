<script>
  import {
    select,
    min,
    max,
    timeDay,
    timeHour,
    scaleLinear,
    scaleBand,
    axisBottom,
    axisLeft,
    timeFormat
  } from 'd3';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { onDestroy } from 'svelte';

  export let data = [];

  let chart;

  let width = 300;
  let height = 370;
  let tooltip;

  $: drawChart(chart, data, width - 150, height);

  const drawChart = (chart, data, width, height) => {
    if (data && data.length && browser) {
      let minDate = min(data, (d) => new Date(d.date));
      let maxDate = max(data, (d) => new Date(d.date));

      let minTime = timeDay.floor(minDate);
      let maxTime = timeDay.ceil(new Date());
      let maxHour = timeHour.ceil(new Date());
      let week = timeDay.floor(timeDay.offset(new Date(), -7));

      let config = {
        '/analytics': {
          tickFormat: '%I:%M %p',
          domain: timeHour.range(minTime, maxHour, 1).map((d) => d.toString()),
          ticks: 2
        },
        '/analytics/weekly': {
          tickFormat: '%A',
          domain: timeDay.range(week, maxTime, 1).map((d) => d.toString()),
          ticks: 1
        },
        '/analytics/all': {
          tickFormat: '%x',
          domain: timeDay.range(week, maxTime, 1).map((d) => d.toString()),
          ticks: 1
        }
      };

      const svg = select(chart);

      const xScale = scaleBand()
        .domain(config[$page.url.pathname].domain)
        .range([0, width])
        .padding(0.4);

      const yScale = scaleLinear()
        .domain([0, max(data.map((d) => d.count)) + 5])
        .range([height, 0])
        .nice();

      const xAxis = axisBottom(xScale)
        .tickValues(
          xScale.domain().filter(function (d, i) {
            const MIN_WIDTH = 100;
            let skip = Math.round((MIN_WIDTH * xScale.domain().length) / width);
            skip = Math.max(config[$page.url.pathname].ticks, skip);
            return !(i % skip);
          })
        )
        .tickPadding(15)
        .tickFormat((t) => {
          const date = new Date(t);
          date.setMinutes(0, 0, 0);
          const formatTime = timeFormat(config[$page.url.pathname].tickFormat);
          return formatTime(date);
        });

      svg
        .select('.x-axis')
        .style('transform', `translate(50px,${height}px)`)
        .style('font-family', 'Inter')
        .style('font-size', '0.9rem')
        .attr('color', '#808385')
        .transition()
        .duration(300)
        .call(xAxis)
        .call((g) => g.selectAll('.tick line').attr('color', '#e8ebed'));

      svg.select('.x-axis').select('path').remove();

      const yAxis = axisLeft(yScale)
        .ticks(8)

        .tickSize(-width - 50);
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

      tooltip = select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('left', '0px')
        .style('top', '0px');

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
          return xScale(xDate[$page.url.pathname]) + 50;
        })
        .attr('y', -height)
        .attr('width', xScale.bandwidth())
        .on('mouseover', function (event, d) {
          let date = new Date(d.date);
          select(this).attr('fill', 'greenyellow');
          tooltip.transition().duration(200).style('opacity', 1);
          tooltip
            .html(
              `<strong>Clicks</strong>: <span style="font-size:1rem">${d.count}</span>` +
                '<br/>' +
                `<span style="font-size:0.95rem">Date: ${timeFormat('%x')(date)}</span>` +
                '<br/>' +
                `<span style="font-size:0.95rem">Last Click: ${timeFormat('%I:%M %p')(date)}</span>`
            )
            .style('left', event.pageX - 40 + 'px')
            .style('top', event.pageY - 100 + 'px');
        })
        .on('mouseout', function () {
          select(this).attr('fill', 'blue');
          tooltip.transition().duration(100).style('opacity', 0);
        })
        .transition()
        .attr('height', (value) => height - yScale(value.count))
        .attr('fill', 'blue');
    }
  };

  onDestroy(() => {
    if (tooltip) {
      tooltip.remove();
    }
  });
</script>

<div class="chart-container flex">
  <div class="chart-title">Click Activity</div>
  {#if data && data.length}
    <div class="chart" bind:clientWidth={width}>
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
    width: clamp(350px, 85vw, 900px);
    min-width: 350px;
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
    width: 100%;
    height: 400px;
    margin-top: 20px;
  }

  .chart-svg {
    margin-left: 50px;
    width: 100%;
    height: 100%;
    overflow: visible !important;
  }
</style>

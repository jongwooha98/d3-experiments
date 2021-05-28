import React from 'react';
import * as d3 from 'd3';

function BarChart() {
  const url =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const dates = data.data.map((d) => d[0]);
      const values = data.data.map((d) => d[1]);
      console.log(values);

      const margin = {
        top: 50,
        right: 20,
        bottom: 30,
        left: 40,
      };
      const width = 900 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const barWidth = width / values.length;

      const svg = d3
        .select('.svgChart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background-color', 'lightblue');

      const xScale = d3
        .scaleTime()
        .domain([new Date(data.from_date), new Date(data.to_date)])
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(values)])
        .range([0, height]);

      const xAxis = d3.axisBottom(xScale).ticks(10);

      const yScaleAxis = d3
        .scaleLinear()
        .domain([0, d3.max(values)])
        .range([height, 0]);

      const yAxis = d3
        .axisLeft(yScaleAxis)
        .ticks(10)
        .tickFormat((value) => `${value / 1000}T`);

      const tooltip = d3
        .select('svgChart')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      //     function handleMouseOver(dates, values) {
      //       tooltip.style('opacity',1)
      //     }

      svg
        .append('g')
        .attr('id', 'x-axis')
        .attr(
          'transform',
          'translate(' + margin.left + ',' + (height + margin.bottom) + ')'
        )
        .call(xAxis);

      svg
        .append('g')
        .attr('id', 'y-axis')
        .attr(
          'transform',
          'translate(' + margin.left + ',' + margin.bottom + ')'
        )
        .call(yAxis);

      svg
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('width', barWidth - 1)
        .attr('height', (d, i) => yScale(d))
        .attr('x', (d, i) => i * barWidth + margin.left)
        .attr('y', (d, i) => height - yScale(d) + margin.bottom)

        .attr('class', 'bar');

      // .on("mouseover", handleMouseOver);
    });

  return (
    <div>
      <div id="title">bar chart title</div>
      <div class="svgChart"></div>
    </div>
  );
}

export default BarChart;

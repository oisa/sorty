import React, { Component } from 'react'
import * as d3 from 'd3'

class BarChart extends Component {

    constructor() {
      super();
      this.state = {
        testState: 1,
        data: [ 2, 4, 2, 6, 8, 12, 4, 13, 2, 11, 12, 13, 1 ]
      };
      this.changeTest = this.changeTest.bind(this);
    }

    componentDidMount() {
        this.drawBarChart(this.state.data);
        // this.drawTesticles(this.state.data);
    }

    drawBarChart(data) {
    const canvasHeight = 400
    const canvasWidth = 600
    const scale = 15
    const svgCanvas = d3.select(this.refs.canvas)
        .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .style("border", "1px solid black")
        svgCanvas.selectAll("rect")
          .data(data).enter()
            .append("rect")
            .attr("width", 40)
            .attr("height", (datapoint) => datapoint * scale)
            .attr("fill", "black")
            .attr("x", (datapoint, iteration) => iteration * 45)
            .attr("y", (datapoint) => canvasHeight - datapoint * scale)
        svgCanvas.selectAll("text")
          .data(data).enter()
            .append("text")
            .attr("x", (dataPoint, i) => i * 45 + 10)
            .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
            .text(dataPoint => dataPoint)
    }

    // drawTesticles(data){
    //   const canvasHeight = 400;
    //   const canvasWidth = 600;
    //   const scale = 15;
    //   const svgCanvas = d3.select(this.refs.testicles)
    //       .append("svg")
    //       .attr("width", canvasWidth)
    //       .attr("height", canvasHeight)
    //       .style("border", "1px solid black")
    //       svgCanvas.selectAll("rect")
    //         .data(data).enter()
    //           .append("rect")
    //           .attr("width", 40)
    //           .attr("height", (datapoint) => datapoint * scale)
    //           .attr("fill", "black")
    //           .attr("x", (datapoint, iteration) => iteration * 45)
    //           .attr("y", (datapoint) => canvasHeight - datapoint * scale)
    //       svgCanvas.selectAll("text")
    //         .data(data).enter()
    //           .append("text")
    //           .attr("x", (dataPoint, i) => i * 45 + 10)
    //           .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
    //           .text(dataPoint => dataPoint)
    // }

    changeTest() {
      this.setState({ testState: this.state.testState + 1 });
      this.setState({ data: [ 4, 4, 2, 6, 8, 12, 4, 13, 2, 11, 12, 13, 1 ] })
    }

    render() {
      return (
        <>
          <button onClick={this.changeTest}>Add Testicles</button>
          <div ref="canvas"></div>
          {/*<div ref="testicles"></div>*/}
        </>
      )
    }
}
export default BarChart;

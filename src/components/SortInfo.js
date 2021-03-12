import React, { Component, useState } from 'react';
import RenderInBrowser from 'react-render-in-browser';

class SortInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ram: 0,
    }
  }

  // Commented out showing RAM Usage
  // componentDidMount() {
  //
  //   this.ramUsage();
  //
  // }
  //
  // ramUsage() {
  //
  //   this.setState({
  //     ram: performance.memory.usedJSHeapSize
  //   })
  //
  //   setTimeout(() => {this.ramUsage()}, 1000);
  //
  // }

  render() {

    return (
      <div className="info-container">
        <h2>{ this.props.sortName }</h2>
        <ul className="info">
          <li>Type: { this.props.type }</li>

          <li>Stability: { this.props.stability }</li>

          <li>Space: { this.props.space }</li>

          <li>Best Case: { this.props.bestCase }</li>

          <li>Average Case: { this.props.averageCase }</li>

          <li>Worst Case: { this.props.worstCase }</li>

          {/*<RenderInBrowser chrome only>
            <li>RAM Usage: { this.state.ram } bytes</li>
          </RenderInBrowser>*/}

          {/*<li>Time taken: this.props.timer</li>*/}
        </ul>
      </div>
    )
  }
};

export default SortInfo;

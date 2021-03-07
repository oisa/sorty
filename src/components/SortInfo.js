import React, { Component } from 'react';

class SortInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

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

          <li>RAM Usage: 1530000000</li>

          <li>Time taken: 11s</li>
        </ul>
      </div>
    )
  }
};

export default SortInfo;

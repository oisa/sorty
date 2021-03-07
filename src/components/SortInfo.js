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
        <h2>{this.props.sortName}</h2>
        <ul className="info">
          <li>Type: Comparison Sort</li>

          <li>Stability: Stable</li>

          <li>Space: 0(1)</li>

          <li>Best Case: Ω(N)</li>

          <li>Average Case: 0(N^2)</li>

          <li>Worst Case: O(N^2)</li>

          <li>RAM Usage: 1530000000</li>

          <li>Time taken: 11s</li>
        </ul>
      </div>
    )
  }
};

export default SortInfo;

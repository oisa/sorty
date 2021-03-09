import React, { Component, useState } from 'react';

import '../App.css';

// Components
import HeaderLogo from './HeaderLogo';
import SortOptions from './SortOptions';
import SortInfo from './SortInfo';
import SortingVisualizer2D from './SortingVisualizer2D.js';
import SortingVisualizer from './SortingVisualizer.js';
import DosDarkMode from './DosDarkMode';

// Buttons
import BubbleIcon from '../assets/BubbleIcon';
import InsertionIcon from '../assets/InsertionIcon';
import BucketIcon from '../assets/BucketIcon';
import RadixIcon from '../assets/RadixIcon';

class App extends Component {

  constructor() {
    super();

    this.state = {
      method: 'bubble',
      sortName: 'Bubble Sort',
      type: 'Comparison',
      stability: 'Stable',
      space: '0(1)',
      bestCase: 'Ω(N)',
      averageCase: '0(N^2)',
      worstCase: 'O(N^2)',
    };
  }

  render() {
    return (
      <div className="app">

        <div className="nav-container">
          <HeaderLogo />
          {/*<SortOptions />*/}
          <div className="sort-options-nav">
            <ul className="sort-list">
              <li>
                <a href="#" onClick={ () => this.setState({
                  method: 'bubble', sortName: 'Bubble Sort', type: 'Comparison', stability: 'Stable', space: '0(1)', bestCase: 'Ω(N)', averageCase: '0(N^2)', worstCase: 'O(N^2)' }) }>
                  <BubbleIcon />
                  Bubble
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  method: 'insertion', sortName: 'Insertion Sort', type: 'Comparison', stability: 'Stable', space: '0(1)', bestCase: 'Ω(N)', averageCase: '0(N^2)', worstCase: 'O(N^2)' }) }>
                  <InsertionIcon />
                  Insertion
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  method: 'bucket', sortName: 'Bucket Sort', type: 'Distribution', stability: 'Stable', space: '0(N+K)', bestCase: 'Ω(N+K)', averageCase: '0(N+K)', worstCase: 'O(N^2)' }) }>
                  <BucketIcon />
                  Bucket
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  method: 'radix', sortName: 'Radix Sort', type: 'Distribution', stability: 'Stable', space: '0(N+K)', bestCase: 'Ω(NK)', averageCase: '0(NK)', worstCase: 'O(NK)' }) }>
                  <RadixIcon />
                  Radix
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  method: 'merge', sortName: 'Merge Sort', type: 'Comparison', stability: 'Stable', space: '0(N)', bestCase: 'Ω(log(N))', averageCase: '0(log(N))', worstCase: 'O(log(N))' }) }>
                  <RadixIcon />
                  Merge
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  method: 'quicksort', sortName: 'Quicksort', type: 'Comparison', stability: 'Unstable', space: '0(log(N))', bestCase: 'Ω(log(N))', averageCase: '0(log(N))', worstCase: 'O(N^2)' }) }>
                  <RadixIcon />
                  Quicksort
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="main-container">
          <SortInfo
            sortName= {this.state.sortName}
            type= {this.state.type}
            stability={this.state.stability}
            space= {this.state.space}
            bestCase= {this.state.bestCase}
            averageCase= {this.state.averageCase}
            worstCase= {this.state.worstCase}
           />
          {/* <SortingVisualizer2D /> */}
          <SortingVisualizer sortName= {this.state.method} />
        </div>

        <DosDarkMode />

      </div>
    );
  }
}

export default App;

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
      sortName: 'Bubble Sort',
      type: 'Comparison Sort',
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
                  sortName: 'Bubble Sort', type: 'Comparison Sort', stability: 'Stable', space: '0(1)', bestCase: 'Ω(N)', averageCase: '0(N^2)', worstCase: 'O(N^2)' }) }>
                  <BubbleIcon />
                  Bubble
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  sortName: 'Insertion Sort' }) }>
                  <InsertionIcon />
                  Insertion
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  sortName: 'Bucket Sort' }) }>
                  <BucketIcon />
                  Bucket
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  sortName: 'Radix Sort' }) }>
                  <RadixIcon />
                  Radix
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  sortName: 'Merge Sort' }) }>
                  <RadixIcon />
                  Merge
                </a>
              </li>
              <li>
                <a href="#" onClick={ () => this.setState({
                  sortName: 'Quicksort' }) }>
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
          <SortingVisualizer />
        </div>

        <DosDarkMode />

      </div>
    );
  }
}

export default App;

import React, { component } from 'react'

import * as d3 from 'd3';

import '../App.css';

import BarChart from './BarChart';
import SortingVisualizer from './SortingVisualizer.js';

function App() {
  return (
    <div className="app">
      <div className="main-container">
        {/* <h1>Sorty</h1>
        <h3>The Sorting Visualiser</h3>
        <h2>Coming soon</h2>}
        {/* <BarChart /> */}
        <SortingVisualizer />
      </div>
    </div>
  );
}

export default App;

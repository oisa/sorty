import React, { component } from 'react'

import * as d3 from 'd3';

import '../App.css';

// Components
import HeaderLogo from './HeaderLogo';
import SortOptions from './SortOptions';
import SortInfo from './SortInfo';
import SortingVisualizer from './SortingVisualizer.js';
import DosDarkMode from './DosDarkMode';

function App() {
  return (
    <div className="app">

      <div className="nav-container">
        <HeaderLogo />
        <SortOptions />
      </div>

      <div className="main-container">
        <SortInfo />
        <SortingVisualizer />
      </div>

      <DosDarkMode />

    </div>
  );
}

export default App;

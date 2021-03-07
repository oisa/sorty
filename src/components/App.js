import React, { component } from 'react'

import '../App.css';

// Components
import HeaderLogo from './HeaderLogo';
import SortOptions from './SortOptions';
import SortInfo from './SortInfo';
import SortingVisualizer2D from './SortingVisualizer2D.js';
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
        {/* <SortingVisualizer2D /> */}
        <SortingVisualizer />
      </div>

      <DosDarkMode />

    </div>
  );
}

export default App;

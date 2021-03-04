import React, { Component } from 'react';

class DosDarkMode extends Component {
  render() {
    return (
      <div className="dos-dark-mode">
        <p>dos mode</p>
        <label className="switch"><input type="checkbox" /> <div></div>
        </label>
      </div>
    )
  }
}

export default DosDarkMode;

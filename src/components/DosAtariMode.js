import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { dosTheme, atariTheme } from './theme';
import { GlobalStyles } from './global';

// Fn to toggle between style modes
function DosAtariMode() {

  let currentTheme;

  if (localStorage.getItem('screenMode') === null) {
    localStorage.setItem('screenMode', 'DOS');
    currentTheme = 'DOS';
  } else {
    currentTheme = localStorage.getItem('screenMode')
  }

  const [theme, setTheme] = useState(currentTheme);

  const toggleTheme = () => {
    if (theme === 'DOS') {
      setTheme('Atari');
      localStorage.setItem('screenMode', 'Atari');
    } else {
      setTheme('DOS');
      localStorage.setItem('screenMode', 'DOS');
    }
  }


  return (
    <ThemeProvider theme={theme === 'DOS' ? dosTheme : atariTheme}>
      <div className="dos-atari-mode">
          <GlobalStyles />
          <p>{theme} mode</p>
          <label className="switch"><input onClick={toggleTheme} type="checkbox" checked={theme === 'Atari' ? 'true' : false}/> <div></div>
          </label>
      </div>
    </ThemeProvider>
  );

}

export default DosAtariMode;

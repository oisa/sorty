import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { dosTheme, atariTheme } from './theme';
import { GlobalStyles } from './global';

// Fn to toggle between style modes
function DosDarkMode() {
  const [theme, setTheme] = useState('DOS');
  const toggleTheme = () => {
    if (theme === 'DOS') {
      setTheme('Atari');
    } else {
      setTheme('DOS');
    }
  }


  return (
    <ThemeProvider theme={theme === 'DOS' ? dosTheme : atariTheme}>
      <div className="dos-atari-mode">
          <GlobalStyles />
          <p>{theme} mode</p>
          <label className="switch"><input onClick={toggleTheme} type="checkbox" /> <div></div>
          </label>
      </div>
    </ThemeProvider>
  );

}

export default DosDarkMode;

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { dosTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';

// Fn to toggle between style modes
function DosDarkMode() {
  const [theme, setTheme] = useState('dos');
  const toggleTheme = () => {
    if (theme === 'dos') {
      setTheme('dark');
    } else {
      setTheme('dos');
    }
  }


  return (
    <ThemeProvider theme={theme === 'dos' ? dosTheme : darkTheme}>
      <div className="dos-dark-mode">
          <GlobalStyles />
          <p>{theme} mode</p>
          <label className="switch"><input onClick={toggleTheme} type="checkbox" /> <div></div>
          </label>
      </div>
    </ThemeProvider>
  );

}

export default DosDarkMode;

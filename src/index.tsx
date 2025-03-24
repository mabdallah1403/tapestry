// css stylesheets
import './assets/css/load.css';  
import './assets/css/utils.css';  
import './assets/css/vars/_fonts.css';  
import './assets/css/vars/_theme.css';

// pages

// custom imports
import './icons';
import { getTheme } from './utils';
import { themeContextType, themeType } from './types';

// third party
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
export const ThemeContext = React.createContext<themeContextType | null>(null);

function Evolve() {
    const [theme, setTheme] = useState<themeType>(getTheme())

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setTheme(getTheme())
    });
    
    return (
      <ThemeContext.Provider value={{theme, setTheme}}>
        <BrowserRouter>
          <Routes>
            {/* TODO: add routes */}
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    )
}
root.render(
  // <React.StrictMode>
    <Evolve />
  // </React.StrictMode>
);


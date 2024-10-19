"use client";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useMemo, useState } from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const ThemeContext = createContext();


export default function RootLayout({ children }) {

  const [darkMode, setDarkMode] = useState(false); // default is light theme

  const toggleTheme = () => {
    setDarkMode((prevValue) => !prevValue);
  };

  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: 'rgb(255, 208, 0)',
          },
          background: {
            default: '#f7f6f6',
          },
        },
        typography: {
          fontFamily: 'var(--font-roboto)',
        },
      }),
    []
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: 'rgb(255, 160, 0)',
          },
          background: {
            default: '#121212',
          },
        },
        typography: {
          fontFamily: 'var(--font-roboto)',
        },
      }),
    []
  );

  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ThemeContext.Provider>

      </body>
    </html>
  );
}

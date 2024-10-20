'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createContext, useEffect, useMemo, useState } from 'react';
import { Roboto } from 'next/font/google';
import { Box, CircularProgress } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const ThemeContext = createContext();


// eslint-disable-next-line import/no-unused-modules
export default function RootLayout({ children }) {

  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const darkModeSavedValue = localStorage.getItem('darkMode');
    if (darkModeSavedValue === 'true') {
      setDarkMode(true);
    }
    setLoading(false);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevValue) => {
      localStorage.setItem('darkMode', !prevValue);
      return !prevValue;
    });
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
          warning: {
            main: '#FFEB3B',
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
          warning: {
            main: '#FFEB3B',
          },
        },
        typography: {
          fontFamily: 'var(--font-roboto)',
        },
      }),
    []
  );

  const loader = (<Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
    }}
  >
    <CircularProgress size={60} />
  </Box>
  )



  return (
    <html lang='en'>
      <head>
        <title>Task Management</title>
      </head>
      <body className={roboto.variable}>
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
          <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            {loading ? loader : children}
          </ThemeProvider>
        </ThemeContext.Provider>

      </body>
    </html>
  );
}

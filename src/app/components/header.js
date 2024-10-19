import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Grid2 as Grid, Box, Grid2, InputAdornment, useTheme, TextField } from '@mui/material';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Search as SearchIcon } from '@mui/icons-material';

const Header = (props) => {
  const {
    toggleTheme,
    darkMode,
    setTaskCreateDialogOpen,
    searchValue,
    setSearchValue,
  } = props;

  const theme = useTheme();

  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Grid2
          container
          alignItems="center"
          justifyContent={'space-between'}
          sx={{
            width: '100%',
          }}
        >
          <Typography variant="h6">
            Task Management App
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search tasks..."
            size="small"
            sx={{
              width: '50%',
              background: theme.palette.background.default,
            }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              },
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            />
          <Box>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 2 }}>
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
              onClick={setTaskCreateDialogOpen}
            >
              Create Task
            </Button>
          </Box>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

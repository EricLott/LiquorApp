import { createTheme } from '@mui/material/styles';

// An oak-inspired custom theme for the app
const theme = createTheme({
  palette: {
    mode: 'dark', // Use a dark theme for better contrast with the video
    primary: {
      main: '#8D6E63', // A warm, earthy brown
    },
    secondary: {
      main: '#FFC107', // A vibrant amber/gold
    },
    background: {
      default: '#1D1616', // A solid, dark, oak-themed background
      paper: 'rgba(46, 34, 34, 0.7)', // A semi-transparent dark paper background
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(29, 22, 22, 0.6)', // Semi-transparent app bar
          backdropFilter: 'blur(10px)', // Frosted glass effect
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(46, 34, 34, 0.9)', // Dark, semi-transparent drawer
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(46, 34, 34, 0.7)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // The background color is inherited from the palette
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

export default theme;

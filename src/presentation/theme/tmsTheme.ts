import { createTheme } from '@mui/material/styles';

export const tmsTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB', // Enterprise Vibrant Blue
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981', // Emerald Green
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#F4F6F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
    success: {
      main: '#10B981',
      light: '#D1FAE5',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
    },
    error: {
      main: '#EF4444',
      light: '#FEE2E2',
    },
    info: {
      main: '#06B6D4',
      light: '#CFFAFE',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#0F172A',
    },
    h6: {
      fontWeight: 700,
      color: '#0F172A',
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
      color: '#64748B',
    },
    body2: {
      fontSize: '0.8125rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
          border: '1px solid #E2E8F0',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px 0 rgba(15, 23, 42, 0.08)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.2)',
          },
        },
      },
    },
  },
});

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#163e43', contrastText: '#ffffff' },
    secondary: { main: '#c6eae3', contrastText: '#163e43' },
    background: { default: '#f7f8f4', paper: '#ffffff' },
    text: { primary: '#173b40', secondary: '#51666a' },
  },
  typography: {
    fontFamily: '"Trebuchet MS", Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.055em', lineHeight: 1.05 },
    h2: { fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.15 },
    h3: { fontWeight: 700, letterSpacing: '-0.025em' },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { padding: '12px 24px', borderRadius: 100 } } },
    MuiContainer: { defaultProps: { maxWidth: 'lg' } },
  },
});

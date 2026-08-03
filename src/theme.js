import { createTheme } from '@mui/material/styles'

// Hogist brand tokens
// Primary red carries the brand; ink is warm-black (not pure black) to match
// the food/hospitality tone; cream is the page ground; gold marks ratings
// and highlights; plum is used sparingly for the dark "app download" band.
export const tokens = {
  red: '#D6293E',
  redDark: '#A81F30',
  redSoft: '#FFE6E1',
  ink: '#241C1A',
  inkSoft: '#6B5C56',
  cream: '#FFF7F0',
  gold: '#F5A623',
  plum: '#3A1620',
}

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.red,
      dark: tokens.redDark,
      light: '#FF6B5A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.gold,
      contrastText: tokens.ink,
    },
    background: {
      default: tokens.cream,
      paper: '#FFFFFF',
    },
    text: {
      primary: tokens.ink,
      secondary: tokens.inkSoft,
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif',
    h1: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h2: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h3: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h4: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
})

export default theme

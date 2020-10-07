import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Main from './main/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a3b57',
    },
    secondary: {
      main: '#2b7066',
    },
  },
  typography: {
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 200,
    }
  }
});

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Main/>
        </ThemeProvider>
      </CssBaseline>
    </React.Fragment>
  )
}

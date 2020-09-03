import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { cyan, green } from '@material-ui/core/colors';
import Main from './search-data/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: cyan[600],
    },
  },
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

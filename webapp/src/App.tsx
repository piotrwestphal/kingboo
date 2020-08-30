import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchCardList from './search-card/SearchCardList';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { cyan, green } from '@material-ui/core/colors';

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
          <SearchCardList/>
        </ThemeProvider>
      </CssBaseline>
    </React.Fragment>
  )
}

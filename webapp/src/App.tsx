import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchRequestList from './search-results/SearchRequestList';

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <SearchRequestList/>
    </React.Fragment>
  )
}

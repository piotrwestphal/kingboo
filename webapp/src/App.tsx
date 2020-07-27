import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <React.Fragment>
      <CssBaseline/>
      <Button variant="contained" color="primary">
        Hello!
      </Button>
    </React.Fragment>

  )
}

export default App;

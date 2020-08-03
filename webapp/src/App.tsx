import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { useFetch } from './useFetch';

function App() {
  const [response, loading, hasError] = useFetch<{ searchId: string }>(`http://${process.env.SEARCH_QUEUE_MANAGER_HOST}:8080/api/v1/search-requests`)
  return (
    <React.Fragment>
      <CssBaseline/>
      <>
        {loading ? <div>Loading...</div> : (hasError ?
          <div>Error occured.</div> : ((response)?.map((data: { searchId: string }) =>
            <div key={data.searchId}>{JSON.stringify(data)}</div>)))}
      </>
      <Button variant="contained" color="primary">
        Hello!
      </Button>
    </React.Fragment>

  )
}

export default App;

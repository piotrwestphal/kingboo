import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Typography } from '@material-ui/core';
import { useFetch } from '../useFetch';
import { SearchDataPayload } from '../core/search-data.payload';
import CardList from './CardList';
// import json from './../example.json'

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      flexGrow: 1,
    },
  }),
);

export default function Main() {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_USER_SERVICE_ADDRESS ?? ''
  const [dto, isLoading, hasError] = useFetch<SearchDataPayload>(
    `${baseUrl}/api/v1/search-data`)

  const showLoading = <Typography>Loading...</Typography>
  const showError = <Typography>Error</Typography>
  const showNoRequests = <Typography>There are no search requests</Typography>

  // console.log({ json });
  // return (<div className={classes.main}><CardList list={(json as any).searchDataList}/></div>)

  return (
    isLoading
      ? showLoading
      : hasError
      ? showError
      : <div className={classes.main}>
        {
          dto?.searchDataList.length
            ?
            <CardList list={dto.searchDataList}/>
            : showNoRequests
        }
      </div>
  );
}
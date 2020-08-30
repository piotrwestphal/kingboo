import React from 'react';
import { createStyles, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFetch } from '../useFetch';
import SearchCard from './SearchCard';
import { SearchDataPayload } from '../core/search-data.payload';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grid: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: 0,
      }
    }
  }),
);

export default function SearchCardList() {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_USER_SERVICE_ADDRESS ?? ''
  const [dto, isLoading, hasError] = useFetch<SearchDataPayload>(
    `${baseUrl}/api/v1/search-data`)

  const showLoading = <Typography>Loading...</Typography>
  const showError = <Typography>Error</Typography>
  const showNoRequests = <Typography>There are no search requests</Typography>
  const showList =
    <Grid container className={classes.grid} spacing={1}>
      {dto?.searchDataList.map((searchData) =>
        <Grid key={searchData.searchId} item xs={12} md={6}>
          <SearchCard searchDataDto={searchData}/>
        </Grid>
      )}
    </Grid>

  return (
    isLoading
      ? showLoading
      : hasError
      ? showError
      : <div className={classes.root}>
        {
          dto?.searchDataList.length
            ? showList
            : showNoRequests
        }
      </div>
  );
}

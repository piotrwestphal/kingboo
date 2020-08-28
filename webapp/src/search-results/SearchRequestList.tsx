import React from 'react';
import { createStyles, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFetch } from '../useFetch';
import { SearchResultDto } from '../core/search-result.dto';
import SearchRequestCard from './SearchRequestCard';

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

export default function SearchRequestList() {
  const classes = useStyles();
  const baseUrl = process.env.REACT_APP_USER_SERVICE_ADDRESS ?? ''
  const [dto, loading, hasError] = useFetch<{ searchResults: SearchResultDto[] }>(
    `${baseUrl}/api/v1/search-results`)
  return (
    loading ? <div>Loading...</div>
      : (hasError
        ? <div>Error</div> :
        <div className={classes.root}>
          <Grid container className={classes.grid} spacing={1}>
            {dto?.searchResults.map((searchResult) =>
              <Grid key={searchResult.searchId} item xs={12} md={6}>
                <SearchRequestCard searchResultDto={searchResult}/>
              </Grid>
            )}
          </Grid>
        </div>
      )
  );
}

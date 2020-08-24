import React from 'react';
import { createStyles, Grid, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFetch } from '../useFetch';
import SearchRequestItem from './SearchRequestItem';
import { SearchResultDto } from '../core/search-result.dto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    item: {
      padding: theme.spacing(1),
      // textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

// const mapper = (dto: SearchRequestDto[]): SearchRequest[] => dto.map(d => ({
//   ...d,
//   checkInDate: new Date(d.checkInDate),
//   checkOutDate: new Date(d.checkOutDate),
//   nextSearchScheduledAt: new Date(d.nextSearchScheduledAt),
// }))

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
          <Grid container spacing={1}>
            {dto?.searchResults.map((searchResult) =>
              <Grid key={searchResult.searchId} item xs={12} md={6}>
                <Paper className={classes.item}>
                  <SearchRequestItem searchResultDto={searchResult}/>
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      )
  );
}

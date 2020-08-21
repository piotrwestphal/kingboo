import React from 'react';
import { createStyles, Grid, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFetch } from '../useFetch';
import { SearchRequestDto } from './search-request.dto';
import { SearchRequest } from './search-request';
import SearchRequestItem from './SearchRequestItem';

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

const mapper = (dto: SearchRequestDto[]): SearchRequest[] => dto.map(d => ({
  ...d,
  checkInDate: new Date(d.checkInDate),
  checkOutDate: new Date(d.checkOutDate),
  nextSearchScheduledAt: new Date(d.nextSearchScheduledAt),
}))

export default function SearchRequestList() {
  const classes = useStyles();

  const [searchRequests, loading, hasError] = useFetch<SearchRequestDto[], SearchRequest[]>(`${process.env.REACT_APP_SEARCH_QUEUE_MANAGER_ADDRESS}/api/v1/search-requests`, mapper)
  console.log({ searchRequests });

  return (
    loading ? <div>Loading...</div>
      : (hasError
        ? <div>Error</div> :
        <div className={classes.root}>
          <Grid container spacing={1}>
            {searchRequests?.map((searchRequest) =>
              <Grid key={searchRequest.searchId} item xs={12} md={6}>
                <Paper className={classes.item}>
                  <SearchRequestItem searchRequest={searchRequest}/>
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      )
  );
}

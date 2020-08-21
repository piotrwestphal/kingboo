import React from 'react';
import { Box, createStyles, Theme } from '@material-ui/core';
import { SearchRequest } from './search-request';
import './SearchRequestItem.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({}),
);

export default function SearchRequestItem({ searchRequest }: { searchRequest: SearchRequest }) {
  const classes = useStyles();
  return (
    <>
      <Box component='p'>
        {searchRequest.searchPlace}
      </Box>
      <Box component='p'>
        {searchRequest.searchPlaceIdentifier}
      </Box>
      <Box component='p'>
        {searchRequest.checkInDate.toDateString()} - {searchRequest.checkOutDate.toDateString()}
      </Box>
    </>
  )
}

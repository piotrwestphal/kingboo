import React from 'react';
import { Box } from '@material-ui/core';
import { SearchResultDto } from '../core/search-result.dto';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({}),
// );

export default function SearchRequestItem({ searchResultDto }: { searchResultDto: SearchResultDto }) {
  // const classes = useStyles();
  return (
    <>
      <Box component='p'>
        {searchResultDto.searchPlace}
      </Box>
      <Box component='p'>
        {searchResultDto.searchPlaceIdentifier}
      </Box>
      <Box component='p'>
        {new Date(searchResultDto.checkInDate).toDateString()} - {new Date(searchResultDto.checkOutDate).toDateString()}
      </Box>
    </>
  )
}

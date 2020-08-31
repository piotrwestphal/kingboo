import React from 'react'
import { CardContent, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchDataDto } from '../core/search-data.dto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }),
);

export default function SearchDetails({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const classes = useStyles();
  return (
    <CardContent className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="p">
        Number of rooms: {searchDataDto.numberOfRooms}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Number of adults: {searchDataDto.numberOfAdults}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        Children age at checkout: {[searchDataDto.childrenAgeAtCheckout].join(', ')}
      </Typography>
    </CardContent>
  )
}

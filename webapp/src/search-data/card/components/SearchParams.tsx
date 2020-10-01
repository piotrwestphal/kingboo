import React from 'react'
import { Box, CardContent, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchDataDto } from '../../../core/search-data.dto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      padding: theme.spacing(0.5),
      marginRight: theme.spacing(0.3),
      marginLeft: theme.spacing(0.3),
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  }),
);

export default function SearchParams({
                                       searchDataDto: {
                                         numberOfRooms,
                                         numberOfAdults,
                                         childrenAgeAtCheckout,
                                         updateFrequencyMinutes,
                                         resultsLimit,
                                       }
                                     }: { searchDataDto: SearchDataDto }) {
  const classes = useStyles();

  const block = (value: string | number, description: string) => value
    ? <Box className={classes.block}>
      <Typography variant='body2' color="textSecondary">{description}</Typography>
      <Typography variant='body2' color="textPrimary">{value}</Typography>
    </Box>
    : null

  return (
    <CardContent className={classes.container}>
      {block(numberOfRooms, 'Rooms')}
      {block(numberOfAdults, 'Adults')}
      {block(childrenAgeAtCheckout.map((v) => `${v} yo`).join(', '), 'Children age')}
      {block(`${updateFrequencyMinutes} min`, 'Update rate')}
      {block(resultsLimit, 'Limit')}
    </CardContent>
  )
}

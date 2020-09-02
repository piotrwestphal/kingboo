import React from 'react'
import { CardContent, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchDataDto } from '../../core/search-data.dto';
import ValueBlock from './ValueBlock';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  }),
);

export default function SearchDetails({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const classes = useStyles();
  return (
    <CardContent className={classes.details}>
      <ValueBlock value={searchDataDto.numberOfRooms}
                  description='Rooms'/>
      <ValueBlock value={searchDataDto.numberOfAdults}
                  description='Adults'/>
      <ValueBlock value={searchDataDto.childrenAgeAtCheckout.map((v) => `${v} yo`).join(', ')}
                  description='Children age'/>
      <ValueBlock value={`${searchDataDto.updateFrequencyMinutes} min`}
                  description='Update rate'/>
      <ValueBlock value={searchDataDto.resultsLimit}
                  description='Limit'/>
    </CardContent>
  )
}

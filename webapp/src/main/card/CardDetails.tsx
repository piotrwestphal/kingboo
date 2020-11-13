import React from 'react'
import { CardContent, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchData } from '../../core/search-data';
import Block from './Block';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  }),
);

interface CardDetailsProps {
  readonly searchData: SearchData
}

export default function CardDetails({
                                      searchData: {
                                        numberOfRooms,
                                        numberOfAdults,
                                        childrenAgeAtCheckout,
                                        updateFrequencyMinutes,
                                        resultsLimit,
                                      }
                                    }: CardDetailsProps) {
  const classes = useStyles();
  return (
    <CardContent className={classes.container}>
      <Block description='Rooms'
             value={numberOfRooms}/>
      <Block description='Adults'
             value={numberOfAdults}/>
      <Block description='Children age'
             value={childrenAgeAtCheckout.map((v) => `${v} yo`).join(', ')}/>
      <Block description='Update rate'
             value={updateFrequencyMinutes}/>
      <Block description='Limit'
             value={resultsLimit}/>
    </CardContent>
  )
}

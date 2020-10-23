import React from 'react'
import { DialogContentProps } from './dialog.state'
import { makeStyles } from '@material-ui/core/styles';
import { Box, createStyles, DialogContent, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(0.5),
      alignItems: 'center'
    },
    description: {
      marginRight: theme.spacing(1),
    },
    value: {
      fontWeight: 500,
      textAlign: 'right'
    },
  }),
);

export default function DetailsContent({
                                         hotel: {
                                           latestValues,
                                           calculatedValues
                                         }
                                       }: DialogContentProps) {
  const classes = useStyles()

  const row = (description: string, value: string) =>
    <Box className={classes.box}>
      <Typography className={classes.description}
                  component='span'
                  variant='body2'
                  color='textSecondary'>
        {description}
      </Typography>
      <Typography className={classes.value}
                  component='span'
                  variant='body2'
                  color='primary'>
        {value}
      </Typography>
    </Box>

  // TODO: update hotel logic!!
  return (
    <DialogContent dividers>
      {row('Property type: ', `${latestValues.starRating ? 'Hotel' : 'Apartment'}`)}
      {latestValues.starRating && row('Star rating: ', `${latestValues.starRating}`)}
      {row('Price: ', `${latestValues.price} zł`)}
      {row('Price rate: ', `${calculatedValues.priceRate}`)}
      {row('Avg price: ', `${calculatedValues.avgPrice} zł`)}
      {row('Min price: ', `${calculatedValues.minPrice} zł`)}
      {row('Max price: ', `${calculatedValues.maxPrice} zł`)}
      {row('Rate: ', `${latestValues.rate}`)}
      {row('Number of reviews: ', `${latestValues.numberOfReviews}`)}
      {row('Newly added: ', `${latestValues.newlyAdded}`)}
      {row('Secondary rate type: ', `${latestValues.secondaryRateType}`)}
      {row('Secondary rate: ', `${latestValues.secondaryRate}`)}
      {row('Bonuses - breakfast: ', `${latestValues.bonuses?.breakfastIncluded}`)}
      {row('Bonuses - cancel later: ', `${latestValues.bonuses?.cancelLater}`)}
      {row('Bonuses - free cancellation: ', `${latestValues.bonuses?.freeCancellation}`)}
      {row('Bonuses - no prepayment: ', `${latestValues.bonuses?.noPrepayment}`)}
      {latestValues.rooms?.map(r => row('Rooms: ', Object.values(r).join(', ')))}
    </DialogContent>
  )
}

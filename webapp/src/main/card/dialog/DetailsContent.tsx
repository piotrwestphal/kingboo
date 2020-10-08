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

export default function DetailsContent({ hotel }: DialogContentProps) {
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

  return (
    <DialogContent dividers>
      {row('District name: ', `${hotel.districtName}`)}
      {row('Distance from center: ', `${hotel.distanceFromCenterMeters} m`)}
      {row('Property type: ', `${hotel.propertyType}`)}
      {row('Star rating: ', `${hotel.starRating}`)}
      {row('Price: ', `${hotel.latestValues.price} zł`)}
      {row('Price rate: ', `${hotel.calculatedValues.priceRate}`)}
      {row('Avg price: ', `${hotel.calculatedValues.avgPrice} zł`)}
      {row('Min price: ', `${hotel.calculatedValues.minPrice} zł`)}
      {row('Max price: ', `${hotel.calculatedValues.maxPrice} zł`)}
      {row('Rate: ', `${hotel.latestValues.rate}`)}
      {row('Number of reviews: ', `${hotel.latestValues.numberOfReviews}`)}
      {row('Newly added: ', `${hotel.latestValues.newlyAdded}`)}
      {row('Secondary rate type: ', `${hotel.latestValues.secondaryRateType}`)}
      {row('Secondary rate: ', `${hotel.latestValues.secondaryRate}`)}
      {row('Bonuses - breakfast: ', `${hotel.latestValues.bonuses?.breakfastIncluded}`)}
      {row('Bonuses - cancel later: ', `${hotel.latestValues.bonuses?.cancelLater}`)}
      {row('Bonuses - free cancellation: ', `${hotel.latestValues.bonuses?.freeCancellation}`)}
      {row('Bonuses - no prepayment: ', `${hotel.latestValues.bonuses?.noPrepayment}`)}
      {row('Rooms: ', `${hotel.latestValues.rooms}`)}
    </DialogContent>
  )
}

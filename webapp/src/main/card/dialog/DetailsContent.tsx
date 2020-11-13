import React from 'react'
import { DialogContentProps } from './dialog.state'
import { makeStyles } from '@material-ui/core/styles';
import { Box, createStyles, DialogContent, Theme, Typography } from '@material-ui/core';
import { HotelBonusesDto } from '../../../core/dto/hotel-bonuses.dto';
import { HotelCalculatedValuesDto } from '../../../core/dto/hotel-calculated-values.dto';
import { HotelRoomDto } from '../../../core/dto/hotel-room.dto';

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
      fontWeight: 400,
    },
  }),
);

// TODO: redesign
// icons for hotel / apartment / newly added
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

  return (
    <DialogContent dividers>
      {latestValues.newlyAdded && row('NEWLY ADDED', ``)}
      {row('Property type: ', `${latestValues.starRating ? 'Hotel' : 'Apartment'}`)}
      {latestValues.starRating && row('Star rating: ', `${latestValues.starRating}`)}
      {row('Price: ', `${latestValues.price} zł`)}
      {row('', `${concatPrices(calculatedValues)}`)}
      {row('Price rate: ', `${calculatedValues.priceRate}`)}
      {row('Rate: ', `${latestValues.rate}`)}
      {latestValues.secondaryRate && row('Secondary rate: ',
        `${latestValues.secondaryRateType} - ${latestValues.secondaryRate}`)}
      {row('Number of reviews: ', `${latestValues.numberOfReviews}`)}
      {latestValues.bonuses && row('Bonuses: ', concatBonuses(latestValues.bonuses))}
      {latestValues.rooms?.map((r, i) => row('', concatRooms(r, i)))}
    </DialogContent>
  )
}

const concatPrices = (calculatedValues: HotelCalculatedValuesDto) => {
  return `Avg [${calculatedValues.avgPrice}], ` +
    `Min [${calculatedValues.minPrice}], ` +
    `Max [${calculatedValues.maxPrice}]`
}

const concatRooms = ({ shortDescription, longDescription, beds, personCount, bonuses }: HotelRoomDto,
                     index: number) => {
  let base = `Room ${index + 1}: Short: [${shortDescription}], ` +
    `Beds: [${beds}], ` +
    `Person count: [${personCount}]`
  if (longDescription) {
    base = base.concat(`, Long: [${longDescription}]`)
  }
  if (bonuses) {
    base = base.concat(`, Bonuses: ${concatBonuses(bonuses)}`)
  }
  return base
}

const concatBonuses = (bonuses: HotelBonusesDto) => {
  const existingBonuses = []
  if (bonuses.breakfastIncluded) {
    existingBonuses.push('Breakfast')
  }
  if (bonuses.cancelLater) {
    existingBonuses.push('Cancel later')
  }
  if (bonuses.freeCancellation) {
    existingBonuses.push('Free cancellation')
  }
  if (bonuses.noPrepayment) {
    existingBonuses.push('No prepayment')
  }
  return existingBonuses.join(', ')
}

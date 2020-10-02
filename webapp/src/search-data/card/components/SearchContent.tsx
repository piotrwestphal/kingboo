import React, { useState } from 'react'
import { Box, CardContent, createStyles, Theme, Typography } from '@material-ui/core';
import { TopHotelsDto } from '../../../core/top-hotels.dto';
import SearchContentItem from './SearchContentItem';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarsIcon from '@material-ui/icons/Stars';
import { SimpleHotelDto } from '../../../core/simple-hotel.dto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
    },
    toggleContainer: {
      paddingBottom: theme.spacing(2),
    },
  }),
);

interface SearchContentProps {
  readonly topHotels: TopHotelsDto | null;
}

export default function SearchContent({ topHotels }: SearchContentProps) {
  const classes = useStyles();
  const [item, setItem] = useState<keyof TopHotelsDto>('bestPriceRate')

  const empty =
    <Typography component="p" color='textSecondary'>
      There are no collected hotels
    </Typography>


  const handleItem = (ev: React.MouseEvent<HTMLElement>, newItem: keyof TopHotelsDto) => {
    if (newItem) {
      setItem(newItem)
    }
  }

  const priceRateValue = (h: SimpleHotelDto) => `${Math.round(h.calculatedValues.priceRate)}`
  const priceValue = (h: SimpleHotelDto) => h.latestValues.price
  const rateValue = (h: SimpleHotelDto) => h.latestValues.rate || 'N/A'
  const distanceValue = (h: SimpleHotelDto) => `${h.distanceFromCenterMeters}m`

  const createItem = (topHotels: TopHotelsDto, item: keyof TopHotelsDto) => {
    switch (item) {
      case 'bestPriceRate':
        return <SearchContentItem simpleHotels={topHotels.bestPriceRate}
                                  title='Best price rate'
                                  primaryValue={priceRateValue}
                                  primaryKey='price rt'
                                  secondaryValue={priceValue}
                                  secondaryKey='price'
                                  tertiaryValue={rateValue}
                                  tertiaryKey='rate'/>
      case 'cheapest':
        return <SearchContentItem simpleHotels={topHotels.cheapest}
                                  title='Cheapest'
                                  primaryValue={priceValue}
                                  primaryKey='price'
                                  secondaryValue={rateValue}
                                  secondaryKey='rate'
                                  tertiaryValue={priceRateValue}
                                  tertiaryKey='price rt'/>
      case 'bestRate':
        return <SearchContentItem simpleHotels={topHotels.bestRate}
                                  title='Best rate'
                                  primaryValue={rateValue}
                                  primaryKey='rate'
                                  secondaryValue={priceValue}
                                  secondaryKey='price'
                                  tertiaryValue={priceRateValue}
                                  tertiaryKey='price rt'/>
      case 'bestLocation':
        return <SearchContentItem simpleHotels={topHotels.bestLocation}
                                  title='Best location'
                                  primaryValue={distanceValue}
                                  primaryKey='center'
                                  secondaryValue={priceValue}
                                  secondaryKey='price'
                                  tertiaryValue={rateValue}
                                  tertiaryKey='rate'/>
    }
  }

  return (
    <CardContent style={{paddingBottom: '8px'}} className={classes.root}>
      {!topHotels ? empty
        :
        <>
          <Box className={classes.toggleContainer}>
            <ToggleButtonGroup exclusive
                               value={item}
                               onChange={handleItem} aria-label="device">
              <ToggleButton value="bestPriceRate" aria-label="bestPriceRate">
                <StarsIcon color='secondary'/>
              </ToggleButton>
              <ToggleButton value="cheapest" aria-label="cheapest">
                <AttachMoneyIcon color='secondary'/>
              </ToggleButton>
              <ToggleButton value="bestRate" aria-label="bestRate">
                <ThumbUpIcon color='secondary'/>
              </ToggleButton>
              <ToggleButton value="bestLocation" aria-label="bestLocation">
                <LocationCityIcon color='secondary'/>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {createItem(topHotels, item)}
        </>
      }
    </CardContent>
  )
}

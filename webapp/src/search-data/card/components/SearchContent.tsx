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
      padding: theme.spacing(1),
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
  const priceRateKey = 'Price rt'
  const priceRateTooltip = 'Price rate [%]'
  const priceValue = (h: SimpleHotelDto) => h.latestValues.price
  const priceKey = 'Price'
  const priceTooltip = 'Price [zł]'
  const rateValue = (h: SimpleHotelDto) => h.latestValues.rate || 'N/A'
  const rateKey = 'Rate'
  const rateTooltip = 'Rate [%]'
  const distanceValue = (h: SimpleHotelDto) => h.distanceFromCenterMeters
  const distanceKey = 'Center'
  const distanceTooltip = 'Distance from center [m]'

  const createItem = (topHotels: TopHotelsDto, item: keyof TopHotelsDto) => {
    switch (item) {
      case 'bestPriceRate':
        return <SearchContentItem simpleHotels={topHotels.bestPriceRate}
                                  title='Best price rate'
                                  primaryValue={priceRateValue}
                                  primaryKey={priceRateKey}
                                  primaryTooltip={priceRateTooltip}
                                  secondaryValue={priceValue}
                                  secondaryKey={priceKey}
                                  secondaryTooltip={priceTooltip}
                                  tertiaryValue={rateValue}
                                  tertiaryKey={rateKey}
                                  tertiaryTooltip={rateTooltip}/>
      case 'cheapest':
        return <SearchContentItem simpleHotels={topHotels.cheapest}
                                  title='Cheapest'
                                  primaryValue={priceValue}
                                  primaryKey={priceKey}
                                  primaryTooltip={priceTooltip}
                                  secondaryValue={rateValue}
                                  secondaryKey={rateKey}
                                  secondaryTooltip={rateTooltip}
                                  tertiaryValue={priceRateValue}
                                  tertiaryKey={priceRateKey}
                                  tertiaryTooltip={priceRateTooltip}/>
      case 'bestRate':
        return <SearchContentItem simpleHotels={topHotels.bestRate}
                                  title='Best rate'
                                  primaryValue={rateValue}
                                  primaryKey={rateKey}
                                  primaryTooltip={rateTooltip}
                                  secondaryValue={priceValue}
                                  secondaryKey={priceKey}
                                  secondaryTooltip={priceTooltip}
                                  tertiaryValue={priceRateValue}
                                  tertiaryKey={priceRateKey}
                                  tertiaryTooltip={priceRateTooltip}/>
      case 'bestLocation':
        return <SearchContentItem simpleHotels={topHotels.bestLocation}
                                  title='Best location'
                                  primaryValue={distanceValue}
                                  primaryKey={distanceKey}
                                  primaryTooltip={distanceTooltip}
                                  secondaryValue={priceValue}
                                  secondaryKey={priceKey}
                                  secondaryTooltip={priceTooltip}
                                  tertiaryValue={rateValue}
                                  tertiaryKey={rateKey}
                                  tertiaryTooltip={rateTooltip}/>
    }
  }

  return (
    <CardContent style={{ paddingBottom: '4px' }} className={classes.root}>
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

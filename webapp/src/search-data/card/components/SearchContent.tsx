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

  const createItem = (topHotels: TopHotelsDto, item: keyof TopHotelsDto) => {
    switch (item) {
      case 'bestPriceRate':
        return <SearchContentItem simpleHotels={topHotels.bestPriceRate}
                                  title='Best price rate'
                                  primaryValue={(h) => h.calculatedValues.priceRate}
                                  primaryKey='price rate'
                                  secondaryValue={(h) => h.latestValues.price}
                                  secondaryKey='price'/>
      case 'cheapest':
        return <SearchContentItem simpleHotels={topHotels.cheapest}
                                  title='Cheapest'
                                  primaryValue={(h) => h.latestValues.price}
                                  primaryKey='price'
                                  secondaryValue={(h) => h.latestValues.rate}
                                  secondaryKey='rate'/>
      case 'bestRate':
        return <SearchContentItem simpleHotels={topHotels.bestRate}
                                  title='Best rate'
                                  primaryValue={(h) => h.latestValues.rate}
                                  primaryKey='rate'
                                  secondaryValue={(h) => h.latestValues.price}
                                  secondaryKey='price'/>
      case 'bestLocation':
        return <SearchContentItem simpleHotels={topHotels.bestLocation}
                                  title='Best location'
                                  primaryValue={(h) => h.distanceFromCenterMeters}
                                  primaryKey='dist to center'
                                  secondaryValue={(h) => h.latestValues.price}
                                  secondaryKey='price'/>
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
                <StarsIcon/>
              </ToggleButton>
              <ToggleButton value="cheapest" aria-label="cheapest">
                <AttachMoneyIcon/>
              </ToggleButton>
              <ToggleButton value="bestRate" aria-label="bestRate">
                <ThumbUpIcon/>
              </ToggleButton>
              <ToggleButton value="bestLocation" aria-label="bestLocation">
                <LocationCityIcon/>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {createItem(topHotels, item)}
        </>
      }
    </CardContent>
  )
}

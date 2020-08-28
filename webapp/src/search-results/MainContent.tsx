import React from 'react'
import { CardContent, Typography } from '@material-ui/core';
import { TopHotelsDto } from '../core/top-hotels.dto';
import TopHotels from './TopHotels';

export default function MainContent({ topHotels }: { topHotels: TopHotelsDto | null }) {

  const empty =
    <Typography variant="body1" component="p" color='textSecondary'>
      There are no collected hotels
    </Typography>

  return (
    <CardContent>
      {!topHotels ? empty
        : <>
          <TopHotels simpleHotels={topHotels.bestPriceRate}
                     title='Best price rate'
                     primaryValue={(h) => h.calculatedValues.priceRate}
                     primaryKey='price rate'
                     secondaryValue={(h) => h.latestValues.price}
                     secondaryKey='price'/>
          <TopHotels simpleHotels={topHotels.cheapest}
                     title='Cheapest'
                     primaryValue={(h) => h.latestValues.price}
                     primaryKey='price'
                     secondaryValue={(h) => h.latestValues.rate}
                     secondaryKey='rate'/>
          <TopHotels simpleHotels={topHotels.bestRate}
                     title='Best rate'
                     primaryValue={(h) => h.latestValues.rate}
                     primaryKey='rate'
                     secondaryValue={(h) => h.latestValues.price}
                     secondaryKey='price'/>
          <TopHotels simpleHotels={topHotels.bestLocation}
                     title='Best location'
                     primaryValue={(h) => h.distanceFromCenterMeters}
                     primaryKey='dist to center'
                     secondaryValue={(h) => h.latestValues.price}
                     secondaryKey='price'/>
        </>
      }
    </CardContent>
  )
}

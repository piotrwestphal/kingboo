import React from 'react'
import { CardContent, Typography } from '@material-ui/core';
import { TopHotelsDto } from '../../core/top-hotels.dto';
import SearchContentItem from './SearchContentItem';

interface SearchContentProps {
  readonly topHotels: TopHotelsDto | null;
}

export default function SearchContent({ topHotels }: SearchContentProps) {
  const empty =
    <Typography component="p" color='textSecondary'>
      There are no collected hotels
    </Typography>

  return (
    <CardContent>
      {!topHotels ? empty
        : <>
          <SearchContentItem simpleHotels={topHotels.bestPriceRate}
                             title='Best price rate'
                             primaryValue={(h) => h.calculatedValues.priceRate}
                             primaryKey='price rate'
                             secondaryValue={(h) => h.latestValues.price}
                             secondaryKey='price'/>
          <SearchContentItem simpleHotels={topHotels.cheapest}
                             title='Cheapest'
                             primaryValue={(h) => h.latestValues.price}
                             primaryKey='price'
                             secondaryValue={(h) => h.latestValues.rate}
                             secondaryKey='rate'/>
          <SearchContentItem simpleHotels={topHotels.bestRate}
                             title='Best rate'
                             primaryValue={(h) => h.latestValues.rate}
                             primaryKey='rate'
                             secondaryValue={(h) => h.latestValues.price}
                             secondaryKey='price'/>
          <SearchContentItem simpleHotels={topHotels.bestLocation}
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

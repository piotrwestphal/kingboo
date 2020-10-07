import React, { useState } from 'react'
import { Box, CardContent as MCardContent, createStyles, Theme, Typography } from '@material-ui/core';
import { TopHotelsDto } from '../../core/dto/top-hotels.dto';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StarsIcon from '@material-ui/icons/Stars';
import { createHotelList } from './content/create-hotel-list';

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

export default function CardContent({ topHotels }: SearchContentProps) {
  const classes = useStyles();
  const [item, setItem] = useState<keyof TopHotelsDto>('bestPriceRate')

  const empty =
    <Typography component="p" color='textSecondary'>
      There are no collected hotels
    </Typography>


  const handleItem = (ev: React.MouseEvent<HTMLElement>, newItem: keyof TopHotelsDto) => {
    setItem(newItem)
  }

  return (
    <MCardContent style={{ paddingBottom: '4px' }} className={classes.root}>
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
          {createHotelList(topHotels, item)}
        </>
      }
    </MCardContent>
  )
}

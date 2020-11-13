import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import StarsIcon from '@material-ui/icons/Stars';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { Box } from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import { TopHotelsDto } from '../../../core/dto/top-hotels.dto';

interface HotelsSelectorProps {
  readonly className: string;
  readonly selectedHotels: keyof TopHotelsDto;
  readonly selectHotels: Dispatch<SetStateAction<keyof TopHotelsDto>>
}

export default function HotelsSelector({ className, selectedHotels, selectHotels }: HotelsSelectorProps) {
  const handleItem = (ev: React.MouseEvent<HTMLElement>, newItem: keyof TopHotelsDto) => {
    selectHotels(newItem)
  }

  return (
    <Box className={className}>
      <ToggleButtonGroup exclusive
                         value={selectedHotels}
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
    </Box>)
}

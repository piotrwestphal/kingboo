import React, { useState } from 'react';
import { Card as MCard, Collapse, Divider } from '@material-ui/core';
import { SearchDataDto } from '../../core/dto/search-data.dto';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardParams from './CardParams';
import CardActions from './CardActions';
import CardDetails from './CardDetails';

export default function Card({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <MCard>
      <CardHeader searchDataDto={searchDataDto} setExpanded={setExpanded}/>
      <Divider/>
      <CardParams searchDataDto={searchDataDto}/>
      <Divider/>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardDetails searchDataDto={searchDataDto}/>
        <Divider/>
        <CardContent topHotels={searchDataDto.topHotels}/>
      </Collapse>
      {expanded && <Divider/>}
      <CardActions expanded={expanded} setExpanded={setExpanded}/>
    </MCard>
  );
}

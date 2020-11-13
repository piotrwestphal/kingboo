import React, { useState } from 'react';
import { Card as MCard, Collapse, Divider } from '@material-ui/core';
import CardContent from './CardContent';
import CardHeader from './header/CardHeader';
import CardActions from './CardActions';
import { SearchData } from '../../core/search-data';
import CardDetails from './CardDetails';

export default function Card({ searchData }: { searchData: SearchData }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <MCard>
      <CardHeader searchData={searchData} setExpanded={setExpanded}/>
      <Divider/>
      <CardDetails searchData={searchData}/>
      <Divider/>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent searchData={searchData}/>
      </Collapse>
      {expanded && <Divider/>}
      <CardActions expanded={expanded} setExpanded={setExpanded}/>
    </MCard>
  );
}

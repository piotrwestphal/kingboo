import React, { useState } from 'react';
import { Card, Collapse, Divider } from '@material-ui/core';
import { SearchDataDto } from '../core/search-data.dto';
import SearchContent from './components/SearchContent';
import SearchHeader from './components/SearchHeader';
import SearchDetails from './components/SearchDetails';
import SearchActions from './components/SearchActions';

// TODO:
//  add toggle buttons for top hotels categories
export default function SearchCard({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <SearchHeader searchDataDto={searchDataDto}/>
      <Divider/>
      <SearchDetails searchDataDto={searchDataDto}/>
      <Divider/>
      <SearchActions expanded={expanded} setExpanded={setExpanded}/>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <SearchContent topHotels={searchDataDto.topHotels}/>
      </Collapse>
    </Card>
  );
}

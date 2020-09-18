import React, { useState } from 'react';
import { Card, Collapse, Divider } from '@material-ui/core';
import { SearchDataDto } from '../../core/search-data.dto';
import SearchContent from './components/SearchContent';
import SearchHeader from './components/SearchHeader';
import SearchParams from './components/SearchParams';
import SearchActions from './components/SearchActions';
import SearchDetails from './components/SearchDetails';

// TODO:
//  add toggle buttons for top hotels categories
export default function SearchCard({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <SearchHeader searchDataDto={searchDataDto}/>
      <Divider/>
      <SearchParams searchDataDto={searchDataDto}/>
      <Divider/>
      <SearchActions expanded={expanded} setExpanded={setExpanded}/>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <SearchDetails searchDataDto={searchDataDto}/>
        <SearchContent topHotels={searchDataDto.topHotels}/>
      </Collapse>
    </Card>
  );
}

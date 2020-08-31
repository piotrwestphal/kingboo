import React, { useState } from 'react';
import { Card, CardActions, Collapse, createStyles, IconButton, Theme } from '@material-ui/core';
import { SearchDataDto } from '../core/search-data.dto';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx'
import TopHotelsList from './TopHotelsList';
import SearchHeader from './SearchHeader';
import SearchDetails from './SearchDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

// TODO:
//  divide by components
//  add more params: type, updateFreq, priority, results limit
// add toggle buttons for top hotels categories
export default function SearchCard({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <SearchHeader searchDataDto={searchDataDto}/>
      <SearchDetails searchDataDto={searchDataDto}/>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon/>
        </IconButton>
        <IconButton className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
        >
          <ExpandMoreIcon/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TopHotelsList topHotels={searchDataDto.topHotels}/>
      </Collapse>
    </Card>
  );
}

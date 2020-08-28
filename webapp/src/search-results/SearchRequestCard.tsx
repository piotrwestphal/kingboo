import React, { useState } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  createStyles,
  IconButton,
  Theme,
  Typography
} from '@material-ui/core';
import { SearchResultDto } from '../core/search-result.dto';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx'
import MainContent from './MainContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContent: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
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
    avatar: {
      backgroundColor: green[600],
    },
  }),
);

// TODO:
//  divide by components
//  add more params: type, updateFreq, priority, results limit
export default function SearchRequestCard({ searchResultDto }: { searchResultDto: SearchResultDto }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const avatarName = (searchPlace: string): string => {
    const divided = searchPlace.split(' ')
    if (divided.length > 1) {
      const word1 = divided[0]
      const word2 = divided[1]
      return word1[0].toUpperCase() + word2[0].toUpperCase()
    } else {
      const word = divided[0]
      return word[0].toUpperCase() + word[1]
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatarName(searchResultDto.searchPlace)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title={
          <>
            <Typography variant="body2" color="textPrimary" component="span">{searchResultDto.searchPlace}</Typography>
            {searchResultDto.searchPlaceIdentifier &&
            <Typography variant="body2"
                        color="textSecondary"
                        component="span"> [{searchResultDto.searchPlaceIdentifier}]</Typography>
            }
          </>
        }
        subheader={`${new Date(searchResultDto.checkInDate).toDateString()} - ${new Date(searchResultDto.checkOutDate).toDateString()}`}
      />

      <CardContent className={classes.mainContent}>
        <Typography variant="body2" color="textSecondary" component="p">
          Number of rooms: {searchResultDto.numberOfRooms}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Number of adults: {searchResultDto.numberOfAdults}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Children age at checkout: {[searchResultDto.childrenAgeAtCheckout].join(', ')}
        </Typography>
      </CardContent>

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
        <MainContent topHotels={searchResultDto.topHotels}/>
      </Collapse>
    </Card>
  );
}

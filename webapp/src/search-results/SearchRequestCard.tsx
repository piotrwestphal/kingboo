import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  createStyles,
  IconButton,
  Link,
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
import LinkIcon from '@material-ui/icons/Link';
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
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
    expandedContent: {},
    hotelsContainer: {
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0),
      }
    },
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(2),
      alignItems: 'center'
    },
    hotelBoxName: {
      marginRight: theme.spacing(2),
      width: theme.spacing(24),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(30),
      },
    },
    hotelBoxValue: {
      marginRight: theme.spacing(1),
      width: theme.spacing(5),
      textAlign: 'right'
    },
    hotelBoxLink: {
      marginLeft: theme.spacing(1),
      height: theme.spacing(3),
    },
  }),
);

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
    <Card className={classes.root}>
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
        {!searchResultDto.topHotels &&
        <CardContent><Typography variant="body1" component="p" color='textSecondary'>There are no collected hotels</Typography></CardContent>}
        {searchResultDto.topHotels &&
        <CardContent className={classes.expandedContent}>
          <Box className={classes.box}>
            <Typography className={classes.hotelBoxName} variant="body1" component="p">Best price rate:</Typography>
            <Typography variant="body2" component="p" color='textSecondary'>price / price rate</Typography>
          </Box>
          <Container className={classes.hotelsContainer}>
            {searchResultDto.topHotels.bestPriceRate.map((hotel) => {
              return <Box key={hotel.hotelId} className={classes.box}>
                <Typography className={classes.hotelBoxName} variant="body2" color='textSecondary' component="p">
                  {hotel.name}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='secondary' component="p">
                  {hotel.latestValues.price}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='primary' component="p">
                  {hotel.calculatedValues.priceRate}
                </Typography>
                <Link className={classes.hotelBoxLink} color='primary' href={hotel.hotelLink}>
                  <LinkIcon/>
                </Link>
              </Box>
            })}
          </Container>
          <Box className={classes.box}>
            <Typography className={classes.hotelBoxName} variant="body1" component="p">Cheapest:</Typography>
            <Typography variant="body2" component="p" color='textSecondary'>rate / price</Typography>
          </Box>
          <Container className={classes.hotelsContainer}>
            {searchResultDto.topHotels.cheapest.map((hotel) => {
              return <Box key={hotel.hotelId} className={classes.box}>
                <Typography className={classes.hotelBoxName} variant="body2" color='textSecondary' component="p">
                  {hotel.name}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='secondary' component="p">
                  {hotel.latestValues.rate}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='primary' component="p">
                  {hotel.latestValues.price}
                </Typography>
                <Link className={classes.hotelBoxLink} color='primary' href={hotel.hotelLink}>
                  <LinkIcon/>
                </Link>
              </Box>
            })}
          </Container>
          <Box className={classes.box}>
            <Typography className={classes.hotelBoxName} variant="body1" component="p">Best rate:</Typography>
            <Typography variant="body2" component="p" color='textSecondary'>price / rate</Typography>
          </Box>
          <Container className={classes.hotelsContainer}>
            {searchResultDto.topHotels.bestRate.map((hotel) => {
              return <Box key={hotel.hotelId} className={classes.box}>
                <Typography className={classes.hotelBoxName} variant="body2" color='textSecondary' component="p">
                  {hotel.name}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='secondary' component="p">
                  {hotel.latestValues.price}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='primary' component="p">
                  {hotel.latestValues.rate}
                </Typography>
                <Link className={classes.hotelBoxLink} color='primary' href={hotel.hotelLink}>
                  <LinkIcon/>
                </Link>
              </Box>
            })}
          </Container>
          <Box className={classes.box}>
            <Typography className={classes.hotelBoxName} variant="body1" component="p">Best location:</Typography>
            <Typography variant="body2" component="p" color='textSecondary'>price / dist to center</Typography>
          </Box>
          <Container className={classes.hotelsContainer}>
            {searchResultDto.topHotels.bestLocation.map((hotel) => {
              return <Box key={hotel.hotelId} className={classes.box}>
                <Typography className={classes.hotelBoxName} variant="body2" color='textSecondary' component="p">
                  {hotel.name}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='secondary' component="p">
                  {hotel.latestValues.price}
                </Typography>
                <Typography className={classes.hotelBoxValue} variant="body1" color='primary' component="p">
                  {hotel.distanceFromCenterMeters}
                </Typography>
                <Link className={classes.hotelBoxLink} color='primary' href={hotel.hotelLink}>
                  <LinkIcon/>
                </Link>
              </Box>
            })}
          </Container>
        </CardContent>
        }
      </Collapse>
    </Card>
  );
}

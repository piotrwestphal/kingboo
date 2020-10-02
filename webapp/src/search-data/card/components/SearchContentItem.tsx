import React from 'react'
import { Box, Container, createStyles, Divider, Link, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleHotelDto } from '../../../core/simple-hotel.dto';
import clsx from 'clsx'
import InfoWrapper from './InfoWrapper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(1.5),
      alignItems: 'center'
    },
    bold: {
      fontWeight: 500,
    },
    tightLetters: {
      letterSpacing: '-0.5px'
    },
    hotelsContainer: {
      padding: theme.spacing(0),
      marginTop: theme.spacing(1),
    },
    primaryColumn: {
      marginRight: theme.spacing(1),
      width: theme.spacing(23),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(30),
      },
    },
    secondaryColumn: {
      marginRight: theme.spacing(1),
      width: theme.spacing(5),
      textAlign: 'right'
    },
    lastColumn: {
      marginRight: theme.spacing(0),
    },
    hotelLinkIcon: {
      fontSize: theme.spacing(2.5),
    },
  }),
);

interface SearchContentItemProps {
  readonly simpleHotels: SimpleHotelDto[];
  readonly title: string;
  readonly primaryValue: (h: SimpleHotelDto) => string | number;
  readonly primaryKey: string;
  readonly primaryTooltip: string;
  readonly secondaryValue: (h: SimpleHotelDto) => string | number;
  readonly secondaryKey: string;
  readonly secondaryTooltip: string;
  readonly tertiaryValue: (h: SimpleHotelDto) => string | number;
  readonly tertiaryKey: string;
  readonly tertiaryTooltip: string;
}

// TODO: remove link from hotel name and open menu with options:
//   details - priceChanges
//   link icon - link to hotel
// TODO: divide to smaller parts, make these parameters easier
export default function SearchContentItem({
                                            simpleHotels,
                                            title,
                                            primaryValue,
                                            primaryKey,
                                            primaryTooltip,
                                            secondaryValue,
                                            secondaryKey,
                                            secondaryTooltip,
                                            tertiaryKey,
                                            tertiaryValue,
                                            tertiaryTooltip,
                                          }: SearchContentItemProps) {
  const classes = useStyles()
  const empty =
    <Box className={classes.box}>
      <Typography className={classes.primaryColumn}>{title}:</Typography>
      <Typography variant="body2" color='textSecondary'>
        There are no hotels that meet conditions
      </Typography>
    </Box>

  return (
    <>
      {!simpleHotels.length ? empty
        : <>
          <Box className={classes.box}>
            <Typography className={classes.primaryColumn}
                        component="p">{title}:</Typography>
            <InfoWrapper title={tertiaryTooltip}>
              <Typography className={clsx(classes.secondaryColumn, classes.tightLetters)}
                          variant="body2"
                          color='textSecondary'>{tertiaryKey}</Typography>
            </InfoWrapper>
            <InfoWrapper title={secondaryTooltip}>
              <Typography className={clsx(classes.secondaryColumn, classes.tightLetters)}
                          variant="body2"
                          color='textSecondary'>{secondaryKey}</Typography>
            </InfoWrapper>
            <InfoWrapper title={primaryTooltip}>
              <Typography className={clsx(classes.secondaryColumn, classes.tightLetters, classes.lastColumn)}
                          variant="body2"
                          color='textSecondary'>{primaryKey}</Typography>
            </InfoWrapper>
          </Box>
          <Divider/>
          <Container className={classes.hotelsContainer}>
            {simpleHotels.map((hotel) => {
              return <Box key={hotel.hotelId} className={classes.box}>
                <Link className={classes.primaryColumn}
                      color='primary'
                      href={hotel.hotelLink}
                      target="_blank">
                  <Typography className={classes.tightLetters}
                              noWrap
                              variant="body2"
                              color='textSecondary'>
                    {hotel.name}
                  </Typography>
                </Link>
                <Typography className={classes.secondaryColumn}
                            variant='body2'
                            color='secondary'>
                  {tertiaryValue(hotel)}
                </Typography>
                <Typography className={classes.secondaryColumn}
                            variant='body2'
                            color='secondary'>
                  {secondaryValue(hotel)}
                </Typography>
                <Typography className={clsx(classes.secondaryColumn, classes.bold, classes.lastColumn)}
                            variant='body2'
                            color='primary'>
                  {primaryValue(hotel)}
                </Typography>
              </Box>
            })}
          </Container>
        </>
      }
    </>
  )
}

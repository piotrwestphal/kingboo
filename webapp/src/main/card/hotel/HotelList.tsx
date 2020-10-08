import React from 'react'
import { Box, Container, createStyles, Divider, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';
import clsx from 'clsx'
import InfoWrapper from '../../../common/InfoWrapper';
import Hotel from './Hotel';

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
      width: theme.spacing(25),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(39),
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
  readonly hotels: SimpleHotelDto[];
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

export default function HotelList({
                                            hotels,
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
      {!hotels.length
        ? empty
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
            {hotels.map((hotel) => {
              return <Box key={hotel.hotelId} className={classes.box}>
                <div className={classes.primaryColumn}>
                  <Hotel hotel={hotel}/>
                </div>
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

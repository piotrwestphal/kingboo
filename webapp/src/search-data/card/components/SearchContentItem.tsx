import React from 'react'
import { Box, Container, createStyles, Link, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleHotelDto } from '../../../core/simple-hotel.dto';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(2),
      alignItems: 'center'
    },
    bold: {
      fontWeight: 500,
    },
    hotelsContainer: {
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0),
      }
    },
    primaryColumn: {
      marginRight: theme.spacing(2),
      width: theme.spacing(22),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(30),
      },
    },
    secondaryColumn: {
      marginRight: theme.spacing(1),
      width: theme.spacing(6),
      textAlign: 'right'
    },
    hotelLink: {
      marginLeft: theme.spacing(0.6),
      height: theme.spacing(2.5),
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
  readonly secondaryValue: (h: SimpleHotelDto) => string | number;
  readonly secondaryKey: string;
}

export default function SearchContentItem({
                                            simpleHotels,
                                            title,
                                            primaryValue,
                                            primaryKey,
                                            secondaryValue,
                                            secondaryKey,
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
            <Typography className={classes.secondaryColumn}
                        variant="body2"
                        color='textSecondary'>{secondaryKey}</Typography>
            <Typography className={classes.secondaryColumn}
                        variant="body2"
                        color='textSecondary'>{primaryKey}</Typography>
          </Box>
          <Container className={classes.hotelsContainer}>
            {simpleHotels.map((hotel) => {
              return <Box key={hotel.hotelId} className={classes.box}>
                <Typography className={classes.primaryColumn}
                            variant="body2"
                            color='textSecondary'>
                  {hotel.name}
                </Typography>
                <Typography className={classes.secondaryColumn}
                            color='secondary'>
                  {secondaryValue(hotel)}
                </Typography>
                <Typography className={clsx(classes.secondaryColumn, classes.bold)}
                            color='primary'>
                  {primaryValue(hotel)}
                </Typography>
                <Link className={classes.hotelLink}
                      color='primary'
                      href={hotel.hotelLink}
                      target="_blank">
                  <OpenInNewIcon className={classes.hotelLinkIcon}/>
                </Link>
              </Box>
            })}
          </Container>
        </>
      }
    </>
  )
}

import React from 'react';
import { Avatar, CardHeader, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchDataDto } from '../../../core/search-data.dto';
import PersonIcon from '@material-ui/icons/Person';
import RepeatIcon from '@material-ui/icons/Repeat';
import { SearchRequestType } from '../../../core/SearchRequestType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      letterSpacing: '1px',
      fontWeight: 400,
    },
    subtitle: {
      letterSpacing: '-0.7px',
    },
    subheader: {
      fontWeight: 400,
    },
    avatar: {
      backgroundColor: theme.palette.primary.light,
      fontWeight: 'bold'
    },
    icons: {
      display: 'flex',
      flexDirection: 'column'
    }
  }),
);

export default function SearchHeader({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const classes = useStyles();

  const createAvatarName = (searchPlace: string): string => {
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

  return (
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          {createAvatarName(searchDataDto.searchPlace)}
        </Avatar>
      }
      title={
        <>
          <Typography className={classes.title}
                      variant="body1"
                      color="primary"
                      component="span">{searchDataDto.searchPlace}</Typography>
          {searchDataDto.searchPlaceIdentifier &&
          <Typography className={classes.subtitle}
                      variant="body2"
                      noWrap
                      color="textSecondary"
                      component="span"> [{searchDataDto.searchPlaceIdentifier}]</Typography>
          }
        </>
      }
      subheader={
        <Typography className={classes.subheader}
                    color="secondary"
                    variant="body2"
                    component="span">{new Date(searchDataDto.checkInDate).toDateString()} - {new Date(searchDataDto.checkOutDate).toDateString()}
        </Typography>}
      action={searchDataDto.type === SearchRequestType.CYCLIC
        ? <RepeatIcon color='disabled'/>
        : <PersonIcon color='disabled'/>
      }
    />
  )
}

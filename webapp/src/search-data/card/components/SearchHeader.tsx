import React from 'react';
import { Avatar, CardHeader, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchDataDto } from '../../../core/search-data.dto';
import PersonIcon from '@material-ui/icons/Person';
import ReplayIcon from '@material-ui/icons/Replay';
import { SearchRequestType } from '../../../core/SearchRequestType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.primary.light,
    },
  }),
);

export default function SearchHeader({ searchDataDto }: { searchDataDto: SearchDataDto }) {
  const classes = useStyles();

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

  return (
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          {avatarName(searchDataDto.searchPlace)}
        </Avatar>
      }
      title={
        <>
          <Typography variant="body1" color="textPrimary" component="span">{searchDataDto.searchPlace}</Typography>
          {searchDataDto.searchPlaceIdentifier &&
          <Typography variant="body2"
                      color="textSecondary"
                      component="span"> [{searchDataDto.searchPlaceIdentifier}]</Typography>
          }
        </>
      }
      subheader={`${new Date(searchDataDto.checkInDate).toDateString()} - ${new Date(searchDataDto.checkOutDate).toDateString()}`}
      action={
        searchDataDto.type === SearchRequestType.CYCLIC
          ? <ReplayIcon color='disabled'/>
          : <PersonIcon color='disabled'/>
      }
    />
  )
}

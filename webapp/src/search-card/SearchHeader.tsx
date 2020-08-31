import React from 'react'
import { Avatar, CardHeader, createStyles, IconButton, Theme, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { SearchDataDto } from '../core/search-data.dto';

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
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon/>
        </IconButton>
      }
      title={
        <>
          <Typography variant="body2" color="textPrimary" component="span">{searchDataDto.searchPlace}</Typography>
          {searchDataDto.searchPlaceIdentifier &&
          <Typography variant="body2"
                      color="textSecondary"
                      component="span"> [{searchDataDto.searchPlaceIdentifier}]</Typography>
          }
        </>
      }
      subheader={`${new Date(searchDataDto.checkInDate).toDateString()} - ${new Date(searchDataDto.checkOutDate).toDateString()}`}
    />
  )
}

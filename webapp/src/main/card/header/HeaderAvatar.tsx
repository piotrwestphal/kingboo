import React from 'react';
import { Avatar, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      backgroundColor: theme.palette.primary.light,
      fontWeight: 'bold'
    },
  }),
);

interface HeaderAvatarProps {
  readonly name: string
}

export default function HeaderAvatar({ name }: HeaderAvatarProps) {
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
    <Avatar aria-label="recipe" className={classes.content}>
      {createAvatarName(name)}
    </Avatar>
  )
}

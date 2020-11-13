import { makeStyles } from '@material-ui/core/styles';
import { Box, createStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      padding: theme.spacing(0.5),
      marginRight: theme.spacing(0.3),
      marginLeft: theme.spacing(0.3),
    },
    value: {
      letterSpacing: '-0.5px'
    }
  }),
);

interface BlockProps {
  readonly description: string
  readonly value: string | number | null
}

export default function Block({ description, value }: BlockProps) {
  const classes = useStyles();
  return (
    value && <Box className={classes.root}>
      <Typography variant='body2' color="textSecondary">{description}</Typography>
      <Typography variant='body2' color="textPrimary">{value}</Typography>
    </Box>
  ) as JSX.Element
}

import React from 'react'
import { createStyles, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      padding: theme.spacing(0.5),
      marginRight: theme.spacing(0.3),
      marginLeft: theme.spacing(0.3),
    },
  }),
);

interface ValueBlockProps {
  readonly value: string | number;
  readonly description: string;
}

export default function ValueBlock({ value, description }: ValueBlockProps) {
  const classes = useStyles();
  if(value) {
    return (
      <div className={classes.block}>
        <Typography variant='body2' color="textSecondary">{description}</Typography>
        <Typography variant='body2' color="textPrimary">{value}</Typography>
      </div>
    )
  } else {
    return null
  }
}

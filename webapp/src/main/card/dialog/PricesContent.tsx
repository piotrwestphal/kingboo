import React from 'react'
import { DialogContentProps } from './dialog.state'
import { Box, createStyles, DialogContent, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatToSecondary } from '../../../util/date-formatter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(0.5),
      alignItems: 'center'
    },
    date: {
      marginRight: theme.spacing(2),
    },
    value: {
      fontWeight: 500,
      marginRight: theme.spacing(1),
      width: theme.spacing(8),
      textAlign: 'right'
    },
  }),
);

export default function PricesContent({ hotel }: DialogContentProps) {
  const classes = useStyles()

  return (
    <DialogContent dividers>
      {hotel.priceChanges.map((v) =>
        <Box key={v.changedAt} className={classes.box}>
          <Typography className={classes.date}
                      component='span'
                      variant='body2'
                      color='textSecondary'>
            {formatToSecondary(v.changedAt)}
          </Typography>
          <Typography className={classes.value}
                      component='span'
                      variant='body2'
                      color='primary'>
            {v.value} [zł]
          </Typography>
          <Typography component='span'
                      variant='body2'
                      color='textSecondary'>
            [{v.occurrenceCount} ct.]
          </Typography>
        </Box>
      )}
    </DialogContent>
  )
}

import React from 'react'
import { DialogContentProps } from './dialog.state'
import { DialogContent, Typography } from '@material-ui/core';

export default function PricesDialogContent({hotel}: DialogContentProps) {
  return (
    <DialogContent dividers={true}>
      {hotel.priceChanges.map((v) =>
        <div key={v.changedAt}>
          <Typography component='span'
                      variant='body2'
                      color='textSecondary'>
            {v.changedAt} --
          </Typography>
          <Typography style={{ fontWeight: 400 }}
                      component='span'
                      variant='body2'
                      color='primary'>
            {v.value} [zł]
          </Typography>
          <Typography component='span'
                      variant='body2'
                      color='textSecondary'>
            -- [{v.occurrenceCount}]
          </Typography>
        </div>
      )}
    </DialogContent>
  )
}

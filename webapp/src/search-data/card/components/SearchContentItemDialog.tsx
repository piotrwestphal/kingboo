import React, { Dispatch, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { SimpleHotelDto } from '../../../core/simple-hotel.dto';

interface SearchContentItemDialogProps {
  readonly open: boolean
  readonly setOpen: Dispatch<SetStateAction<boolean>>
  readonly hotel: SimpleHotelDto
}

export default function SearchContentItemDialog({
                                                  hotel,
                                                  open,
                                                  setOpen
                                                }: SearchContentItemDialogProps) {

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title"
                   disableTypography>
        <Typography variant='body1'
                    color='textPrimary'>
          {hotel.name}
        </Typography>
      </DialogTitle>
      <DialogContent dividers={true}>
        {hotel.priceChanges.map((v) =>
          <div key={v.changedAt}>
            <Typography component='span'
                        variant='body2'
                        color='textSecondary'>
              {v.changedAt} --
            </Typography>
            <Typography style={{fontWeight: 400}}
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
      <DialogActions>
        <Button color="secondary"
                onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

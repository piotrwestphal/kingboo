import React, { Dispatch, FunctionComponentElement, SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@material-ui/core';
import { DialogState, DialogContentProps } from './dialog.state';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';

interface SearchContentItemDialogProps {
  readonly hotel: SimpleHotelDto
  readonly open: boolean
  readonly setDialog: Dispatch<SetStateAction<DialogState>>
  readonly children?: FunctionComponentElement<DialogContentProps>
}

export default function ItemDialog({
                                     hotel,
                                     open,
                                     setDialog,
                                     children: dialogContent,
                                   }: SearchContentItemDialogProps) {

  const handleClose = () => {
    setDialog({ open: false });
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
      {dialogContent}
      <DialogActions>
        <Button color="secondary"
                onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

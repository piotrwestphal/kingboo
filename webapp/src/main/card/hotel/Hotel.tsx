import React, { useState } from 'react'
import { createStyles, Dialog, Typography } from '@material-ui/core';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import clsx from 'clsx'
import DialogBody from '../dialog/DialogBody';
import HotelMenu from './HotelMenu';
import { DialogState } from '../dialog/dialog.state';

const useStyles = makeStyles(() =>
  createStyles({
    tightLetters: {
      letterSpacing: '-0.5px'
    },
    boldLetters: {
      fontWeight: 400,
    },
  }),
);

interface HotelProps {
  readonly hotel: SimpleHotelDto
}

export default function Hotel({ hotel }: HotelProps) {
  const classes = useStyles()
  const [{ initialView, open }, setDialog] = useState<DialogState>({ open: false })

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
    <>
      <PopupState variant="popover">
        {(popupState) => (
          <>
            <Typography {...bindTrigger(popupState)}
                        className={clsx(classes.tightLetters,
                          { [classes.boldLetters]: popupState.isOpen })}
                        noWrap
                        variant="body2"
                        color={popupState.isOpen ? 'primary' : 'textSecondary'}>
              {hotel.name}
            </Typography>
            <HotelMenu hotel={hotel}
                       popupState={popupState}
                       setDialog={setDialog}/>
          </>
        )}
      </PopupState>
      <Dialog
        open={open}
        onClose={() => setDialog({ open: false })}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        {open && <DialogBody hotel={hotel}
                    initialView={initialView!}
                    setDialog={setDialog}/>}
      </Dialog>
    </>
  )
}

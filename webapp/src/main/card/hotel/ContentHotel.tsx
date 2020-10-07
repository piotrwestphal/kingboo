import React, { createElement, useState } from 'react'
import { createStyles, Typography } from '@material-ui/core';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindTrigger } from 'material-ui-popup-state';
import clsx from 'clsx'
import ItemDialog from '../dialog/ItemDialog';
import ContentHotelMenu from './ContentHotelMenu';
import { DialogContentProps, DialogState } from '../dialog/dialog.state';

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

interface SearchContentItemHotelProps {
  readonly hotel: SimpleHotelDto
}

export default function ContentHotel({ hotel }: SearchContentItemHotelProps) {
  const classes = useStyles()
  const [{ dialog, open }, setDialog] = useState<DialogState>({ open: false })

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
            <ContentHotelMenu hotel={hotel}
                              popupState={popupState}
                              setDialog={setDialog}/>
          </>
        )}
      </PopupState>
      <ItemDialog hotel={hotel}
                  open={open}
                  setDialog={setDialog}>
        {dialog && createElement<DialogContentProps>(dialog, { hotel })}
      </ItemDialog>
    </>
  )
}

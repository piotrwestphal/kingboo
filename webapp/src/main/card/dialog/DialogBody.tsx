import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, createStyles, DialogActions, DialogTitle, Theme, Typography } from '@material-ui/core';
import { DialogState, DialogView } from './dialog.state';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';
import DetailsContent from './DetailsContent';
import PricesContent from './PricesContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
    spaceLeft: {
      marginLeft: 'auto',
    },
  }),
);


interface DialogProps {
  readonly hotel: SimpleHotelDto
  readonly initialView: DialogView
  readonly setDialog: Dispatch<SetStateAction<DialogState>>
}

export default function DialogBody({
                                     hotel,
                                     initialView,
                                     setDialog,
                                   }: DialogProps) {
  const classes = useStyles();
  const [view, setView] = useState<DialogView>(initialView)

  const dialogContent = (v: DialogView) => {
    switch (v) {
      case DialogView.DETAILS:
        return <DetailsContent hotel={hotel}/>
      case DialogView.PRICES:
        return <PricesContent hotel={hotel}/>
    }
  }

  return (
    <>
      <DialogTitle id="scroll-dialog-title"
                   disableTypography>
        <Typography variant='body1'
                    color='textPrimary'>
          {hotel.name}
        </Typography>
      </DialogTitle>
      {dialogContent(view)}
      <DialogActions className={classes.root}
                     disableSpacing>
        <Button color='primary'
                disabled={view === DialogView.PRICES}
                onClick={() => setView(DialogView.PRICES)}>
          Prices
        </Button>
        <Button color='primary'
                disabled={view === DialogView.DETAILS}
                onClick={() => setView(DialogView.DETAILS)}>
          Details
        </Button>
        <Button className={classes.spaceLeft}
                onClick={() => setDialog({ open: false })}>
          Close
        </Button>
      </DialogActions>
    </>)
}

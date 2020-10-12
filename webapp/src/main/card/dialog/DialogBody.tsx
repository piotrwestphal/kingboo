import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Box,
  Button,
  createStyles,
  DialogActions,
  DialogTitle,
  IconButton,
  Link,
  Theme,
  Typography
} from '@material-ui/core';
import { DialogState, DialogView } from './dialog.state';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';
import DetailsContent from './DetailsContent';
import PricesContent from './PricesContent';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2.5),
    },
    tightLetters: {
      letterSpacing: '-0.5px'
    },
    spaceRight: {
      marginRight: theme.spacing(2),
    },
    spaceLeft: {
      marginLeft: 'auto',
    },
    subtitleContainer: {
      marginTop: theme.spacing(1),
      display: 'flex'
    },
    closeButton: {
      position: 'absolute',
      padding: theme.spacing(0.5),
      paddingTop: theme.spacing(1.5),
      right: theme.spacing(0.5),
      top: theme.spacing(0.5),
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
        <Typography className={classes.spaceRight}
                    variant='body1'
                    color='textPrimary'>
          {hotel.name}
        </Typography>
        <Box className={clsx(classes.subtitleContainer, classes.spaceRight)}>
          {hotel.districtName && <Typography className={clsx(classes.tightLetters, classes.spaceRight)}
                                             variant='body2'
                                             component='span'
                                             color='textSecondary'>
            District: {hotel.districtName}
          </Typography>}
          <Typography className={clsx(classes.tightLetters, { [classes.spaceLeft]: hotel.districtName })}
                      variant='body2'
                      component='span'
                      color='textSecondary'>
            {hotel.distanceFromCenterMeters}m {hotel.districtName ? 'to center' : 'to search place'}
          </Typography>
        </Box>
        <IconButton aria-label="close"
                    className={classes.closeButton}
                    onClick={() => setDialog({ open: false })}>
          <CloseIcon color='disabled'/>
        </IconButton>
      </DialogTitle>
      {dialogContent(view)}
      <DialogActions className={classes.root}
                     disableSpacing>
        <Link color='primary'
              href={hotel.hotelLink}
              target="_blank">
          <Button color='secondary'>
            <OpenInNewIcon/>
          </Button>
        </Link>
        {view !== DialogView.PRICES &&
        <Button className={classes.spaceLeft}
                color='primary'
                onClick={() => setView(DialogView.PRICES)}>
          {DialogView.PRICES}
        </Button>}
        {view !== DialogView.DETAILS &&
        <Button className={classes.spaceLeft}
                color='primary'
                onClick={() => setView(DialogView.DETAILS)}>
          {DialogView.DETAILS}
        </Button>}
      </DialogActions>
    </>)
}

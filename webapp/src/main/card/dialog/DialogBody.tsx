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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2.5),
    },
    title: {
      maxWidth: theme.spacing(27),
      marginRight: theme.spacing(2),
    },
    spaceLeft: {
      marginLeft: 'auto',
    },
    subtitleContainer: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column'
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
  const { name, latestValues: { districtName, distanceFromCenterMeters, hotelLink } } = hotel
  const [view, setView] = useState<DialogView>(initialView)

  const dialogContent = (v: DialogView) => {
    switch (v) {
      case DialogView.DETAILS:
        return <DetailsContent hotel={hotel}/>
      case DialogView.PRICES:
        return <PricesContent hotel={hotel}/>
    }
  }

  const conditionalDialogButton = (v: DialogView) =>
    view !== v && <Button className={classes.spaceLeft}
                          color='primary'
                          onClick={() => setView(v)}>{v}</Button>

  return (
    <>
      <DialogTitle id="scroll-dialog-title"
                   disableTypography>
        <Typography className={classes.title}
                    variant='body1'
                    color='textPrimary'>
          {name}
        </Typography>
        <Box className={classes.subtitleContainer}>
          {districtName && <Typography variant='body2'
                                       component='span'
                                       color='textSecondary'>
            District: {districtName}
          </Typography>}
          <Typography variant='body2'
                      component='span'
                      color='textSecondary'>
            {distanceFromCenterMeters}m {districtName ? 'to center' : 'to search place'}
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
              href={hotelLink}
              target="_blank">
          <Button color='secondary'>
            <OpenInNewIcon/>
          </Button>
        </Link>
        {conditionalDialogButton(DialogView.DETAILS)}
        {conditionalDialogButton(DialogView.PRICES)}
      </DialogActions>
    </>)
}

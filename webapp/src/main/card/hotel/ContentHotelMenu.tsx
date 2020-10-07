import React, { createElement, Dispatch, SetStateAction } from 'react';
import { bindMenu } from 'material-ui-popup-state';
import { createStyles, Link, ListItemIcon, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DetailsIcon from '@material-ui/icons/Details';
import { makeStyles } from '@material-ui/core/styles';
import { SimpleHotelDto } from '../../../core/dto/simple-hotel.dto';
import { PopupState } from 'material-ui-popup-state/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DetailsDialogContent from '../dialog/DetailsDialogContent';
import PricesDialogContent from '../dialog/PricesDialogContent';
import { DialogState } from '../dialog/dialog.state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      margin: theme.spacing(0),
      padding: theme.spacing(1),
    },
    icon: {
      minWidth: theme.spacing(0),
      marginRight: theme.spacing(1),
    },
  }),
);

type SearchContentItemMenuProps = {
  readonly hotel: SimpleHotelDto
  readonly popupState: PopupState
  readonly setDialog: Dispatch<SetStateAction<DialogState>>
}

export default function ContentHotelMenu({
                                                hotel,
                                                popupState,
                                                setDialog
                                              }: SearchContentItemMenuProps) {
  const classes = useStyles()
  const menuItem = (text: string,
                    icon: OverridableComponent<SvgIconTypeMap>,
                    onClick: () => void) =>
    <MenuItem className={classes.item}
              color='secondary'
              onClick={onClick}>
      <ListItemIcon className={classes.icon}>
        {createElement(icon)}
      </ListItemIcon>
      <Typography variant="body2"
                  color='textSecondary'>
        {text}
      </Typography>
    </MenuItem>

  return (
    <Menu getContentAnchorEl={null}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          {...bindMenu(popupState)}>
      <Link color='primary'
            href={hotel.hotelLink}
            target="_blank">
        {menuItem('Link', OpenInNewIcon, () => popupState.close)}
      </Link>
      {menuItem('Details', DetailsIcon, () => {
        setDialog({ open: true, dialog: DetailsDialogContent });
        popupState.close()
      })}
      {menuItem('Prices', MonetizationOnIcon, () => {
        setDialog({ open: true, dialog: PricesDialogContent });
        popupState.close()
      })}
    </Menu>
  )
}

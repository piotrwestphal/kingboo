import React, { useState } from 'react'
import { createStyles, Link, ListItemIcon, Menu, MenuItem, Theme, Typography } from '@material-ui/core';
import { SimpleHotelDto } from '../../../core/simple-hotel.dto';
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DetailsIcon from '@material-ui/icons/Details';
import clsx from 'clsx'
import SearchContentItemDialog from './SearchContentItemDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tightLetters: {
      letterSpacing: '-0.5px'
    },
    boldLetters: {
      fontWeight: 400,
    },
    icon: {
      minWidth: theme.spacing(0),
      marginRight: theme.spacing(1),
    },
    item: {
      margin: theme.spacing(0),
      padding: theme.spacing(1),
    },
  }),
);

interface SearchContentItemHotelProps {
  readonly hotel: SimpleHotelDto
}

export default function SearchContentItemHotel({ hotel }: SearchContentItemHotelProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(false);

  return (
    <>
      <PopupState variant="popover">
        {(popupState) => (
          <React.Fragment>
            <Typography {...bindTrigger(popupState)}
                        className={clsx(classes.tightLetters,
                          { [classes.boldLetters]: popupState.isOpen })}
                        noWrap
                        variant="body2"
                        color={popupState.isOpen ? 'primary' : 'textSecondary'}>
              {hotel.name}
            </Typography>
            <Menu getContentAnchorEl={null}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  {...bindMenu(popupState)}>
              <Link color='primary'
                    href={hotel.hotelLink}
                    target="_blank">
                <MenuItem className={classes.item}
                          onClick={popupState.close}>
                  <ListItemIcon className={classes.icon}
                                color='secondary'><OpenInNewIcon/></ListItemIcon>
                  <Typography variant="body2"
                              color='textSecondary'>
                    Link
                  </Typography>
                </MenuItem>
              </Link>
              <MenuItem className={classes.item}
                        color='secondary'
                        onClick={() => {
                          setOpen(true);
                          popupState.close()
                        }}>
                <ListItemIcon className={classes.icon}>
                  <DetailsIcon/>
                </ListItemIcon>
                <Typography variant="body2"
                            color='textSecondary'>
                  Details
                </Typography>
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      <SearchContentItemDialog hotel={hotel}
                               open={open}
                               setOpen={setOpen}/>
    </>
  )
}
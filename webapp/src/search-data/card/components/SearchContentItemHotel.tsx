import React from 'react'
import { createStyles, Link, Menu, MenuItem, Theme, Typography, ListItemIcon } from '@material-ui/core';
import { SimpleHotelDto } from '../../../core/simple-hotel.dto';
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DetailsIcon from '@material-ui/icons/Details';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tightLetters: {
      letterSpacing: '-0.5px'
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

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Typography {...bindTrigger(popupState)}
                      className={classes.tightLetters}
                      noWrap
                      variant="body2"
                      color='textSecondary'>
            {hotel.name}
          </Typography>
          <Menu {...bindMenu(popupState)}>
            <Link color='primary'
                  href={hotel.hotelLink}
                  target="_blank">
              <MenuItem className={classes.item}
                        onClick={popupState.close}>
                <ListItemIcon className={classes.icon}><OpenInNewIcon/></ListItemIcon>
                <Typography variant="body2"
                            color='textSecondary'>
                  Link
                </Typography>
              </MenuItem>
            </Link>
            <MenuItem className={classes.item}
                      onClick={() => {
                        console.log({details: hotel})
                        popupState.close()
                      }}>
              <ListItemIcon className={classes.icon}><DetailsIcon/></ListItemIcon>
              <Typography variant="body2"
                          color='textSecondary'>
                Details
              </Typography>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>


  )
}

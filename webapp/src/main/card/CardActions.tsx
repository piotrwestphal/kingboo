import React, { Dispatch, SetStateAction } from 'react'
import { CardActions as MCardActions, createStyles, IconButton, Theme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
    action: {
      padding: theme.spacing(1),
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

interface SearchActionsProps {
  readonly expanded: boolean
  readonly setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function CardActions({ expanded, setExpanded }: SearchActionsProps) {
  const classes = useStyles();
  return (
    <MCardActions className={classes.root} disableSpacing>
      <IconButton className={classes.action}
                  aria-label="edit search request">
        <EditIcon/>
      </IconButton>
      <IconButton className={classes.action}
                  aria-label="delete search request">
        <DeleteIcon/>
      </IconButton>
      <IconButton className={clsx(
        classes.expand,
        classes.action,
        {
          [classes.expandOpen]: expanded,
        })}
                  aria-label="show more"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((current) => !current)}>
        <ExpandMoreIcon/>
      </IconButton>
    </MCardActions>
  )
}

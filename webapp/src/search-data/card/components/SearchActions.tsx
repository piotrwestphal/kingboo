import React, { Dispatch, SetStateAction } from 'react'
import { CardActions, createStyles, IconButton, Theme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
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
  readonly expanded: boolean;
  readonly setExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function SearchActions({ expanded, setExpanded }: SearchActionsProps) {
  const classes = useStyles();
  return (
    <CardActions className={classes.container} disableSpacing>
      <IconButton aria-label="edit search request">
        <EditIcon/>
      </IconButton>
      <IconButton aria-label="delete search request">
        <DeleteIcon/>
      </IconButton>
      <IconButton className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
                  onClick={() => setExpanded((current) => !current)}
                  aria-expanded={expanded}
                  aria-label="show more">
        <ExpandMoreIcon/>
      </IconButton>
    </CardActions>
  )
}

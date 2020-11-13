import React from 'react';
import { SearchRequestType } from '../../../core/SearchRequestType';
import RepeatIcon from '@material-ui/icons/Repeat';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  }),
);

interface HeaderActionProps {
  readonly type: SearchRequestType
}

export default function HeaderAction({ type }: HeaderActionProps) {
  const classes = useStyles();

  return (
    <div className={classes.action}>{
      type === SearchRequestType.CYCLIC
        ? <RepeatIcon color='disabled'/>
        : <PersonIcon color='disabled'/>
    }
    </div>
  )
}

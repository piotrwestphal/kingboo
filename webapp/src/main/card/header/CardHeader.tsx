import React, { Dispatch, SetStateAction } from 'react';
import { CardHeader as MCardHeader, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchData } from '../../../core/search-data';
import HeaderAvatar from './HeaderAvatar';
import HeaderTitle from './HeaderTitle';
import HeaderAction from './HeaderAction';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootOverride: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(1.5),
    },
    avatarOverride: {
      marginRight: theme.spacing(1.5),
    },
    subheader: {
      fontWeight: 400,
    },
  }),
);

interface SearchHeaderProps {
  readonly searchData: SearchData
  readonly setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function CardHeader({
                                     searchData: {
                                       type,
                                       searchPlace,
                                       destination,
                                       stayDate,
                                     },
                                     setExpanded,
                                   }: SearchHeaderProps) {
  const classes = useStyles();

  return (
    <MCardHeader onClick={() => setExpanded((current) => !current)}
                 classes={{ root: classes.rootOverride, avatar: classes.avatarOverride }}
                 avatar={<HeaderAvatar name={searchPlace}/>}
                 title={<HeaderTitle title={searchPlace} subtitle={destination}/>}
                 subheader={<Typography className={classes.subheader}
                                        color="secondary"
                                        variant="body2"
                                        component="span">{stayDate}</Typography>}
                 action={<HeaderAction type={type}/>}
    />
  )
}

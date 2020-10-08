import React, { Dispatch, SetStateAction } from 'react';
import { Avatar, CardHeader as MCardHeader, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchDataDto } from '../../core/dto/search-data.dto';
import PersonIcon from '@material-ui/icons/Person';
import RepeatIcon from '@material-ui/icons/Repeat';
import { SearchRequestType } from '../../core/SearchRequestType';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(1.5),
    },
    avatar: {
      marginRight: theme.spacing(1.5),
    },
    avatarContent: {
      backgroundColor: theme.palette.primary.light,
      fontWeight: 'bold'
    },
    title: {
      letterSpacing: '1px',
      fontWeight: 400,
    },
    subtitle: {
      letterSpacing: '-0.7px',
    },
    subheader: {
      fontWeight: 400,
    },
    action: {
      marginTop: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
    icons: {
      display: 'flex',
      flexDirection: 'column'
    }
  }),
);

interface SearchHeaderProps {
  readonly searchDataDto: SearchDataDto
  readonly setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function CardHeader({
                                       searchDataDto,
                                       setExpanded,
                                     }: SearchHeaderProps) {
  const classes = useStyles();

  const createAvatarName = (searchPlace: string): string => {
    const divided = searchPlace.split(' ')
    if (divided.length > 1) {
      const word1 = divided[0]
      const word2 = divided[1]
      return word1[0].toUpperCase() + word2[0].toUpperCase()
    } else {
      const word = divided[0]
      return word[0].toUpperCase() + word[1]
    }
  }

  return (
    <MCardHeader
      onClick={() => setExpanded((current) => !current)}
      classes={{
        root: classes.root,
        avatar: classes.avatar,
      }}
      avatar={
        <Avatar aria-label="recipe" className={classes.avatarContent}>
          {createAvatarName(searchDataDto.searchPlace)}
        </Avatar>
      }
      title={
        <>
          <Typography className={classes.title}
                      variant="body1"
                      color="primary"
                      component="span">{searchDataDto.searchPlace}</Typography>
          {searchDataDto.searchPlaceIdentifier &&
          <Typography className={classes.subtitle}
                      variant="body2"
                      noWrap
                      color="textSecondary"
                      component="span"> [{searchDataDto.searchPlaceIdentifier}]</Typography>
          }
        </>
      }
      subheader={
        <Typography className={classes.subheader}
                    color="secondary"
                    variant="body2"
                    component="span">{new Date(searchDataDto.checkInDate).toDateString()} - {new Date(searchDataDto.checkOutDate).toDateString()}
        </Typography>}
      action={
        <div className={classes.action}>{
          searchDataDto.type === SearchRequestType.CYCLIC
            ? <RepeatIcon color='disabled'/>
            : <PersonIcon color='disabled'/>
        }
        </div>}
    />
  )
}
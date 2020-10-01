import React from 'react'
import { SearchDataDto } from '../../../core/search-data.dto';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CardContent, createStyles, Theme, Typography } from '@material-ui/core';
import { formatToSecondary } from '../../../util/date-formatter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    block: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      minWidth: theme.spacing(12),
      padding: theme.spacing(0.5),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
    value: {
      letterSpacing: '-0.5px'
    }
  }),
);

interface SearchDetailsProps {
  readonly searchDataDto: SearchDataDto;
}

export default function SearchDetails({
                                        searchDataDto: {
                                          collectingCount,
                                          collectingFinishedAt,
                                          nextSearchScheduledAt,
                                        }
                                      }: SearchDetailsProps) {
  const classes = useStyles();

  const block = (value: string | number | null, description: string) => value
    ? <Box className={classes.block}>
      <Typography variant='body2'
                  color="textSecondary">{description}</Typography>
      <Typography className={classes.value}
                  variant='body2'
                  color="textPrimary">{value}</Typography>
    </Box>
    : null

  // TODO: move to mapper
  const finishedAt = collectingFinishedAt ? formatToSecondary(collectingFinishedAt) : null
  const scheduledAt = formatToSecondary(nextSearchScheduledAt)

  return (
    <CardContent className={classes.container}>
      {block(collectingCount, 'Collecting ct.')}
      {block(finishedAt, 'Finished at')}
      {block(scheduledAt, 'Scheduled at')}
    </CardContent>
  )
}

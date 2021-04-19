import { DialogContentProps } from './dialog.state'
import { Box, createStyles, DialogContent, Divider, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { formatToSecondary } from '../../../util/date-formatter'
import clsx from 'clsx'
import InfoWrapper from '../../../common/InfoWrapper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      marginBottom: theme.spacing(0.5),
      alignItems: 'center'
    },
    bottomSpace: {
      marginBottom: theme.spacing(1),
    },
    date: {
      marginRight: theme.spacing(2),
    },
    valueColumn: {
      marginRight: theme.spacing(1),
      width: theme.spacing(6),
      textAlign: 'right'
    },
    value: {
      fontWeight: 500,
    },
    occurrence: {
      width: theme.spacing(6),
      textAlign: 'right'
    }
  }),
)

export default function PricesContent({ hotel }: DialogContentProps) {
  const classes = useStyles()

  return (
    <DialogContent dividers>
      <Box className={clsx(classes.box, classes.bottomSpace)}>
        <InfoWrapper title='The time when the price changed'>
          <Typography className={classes.date}
                      component='span'
                      variant='body2'
                      color='textSecondary'>
            Price changed at:
          </Typography>
        </InfoWrapper>
        <InfoWrapper title='Price [zł]'>
          <Typography className={classes.valueColumn}
                      component='span'
                      variant='body2'
                      color='textSecondary'>
            Price
          </Typography>
        </InfoWrapper>
        <InfoWrapper title='Number of price occurrences'>
          <Typography className={classes.occurrence}
                      component='span'
                      variant='body2'
                      color='textSecondary'>
            Occur
          </Typography>
        </InfoWrapper>
      </Box>
      <Divider className={classes.bottomSpace}/>
      {hotel.priceChanges.map((v) =>
        <Box key={v.changedAt} className={classes.box}>
          <Typography className={classes.date}
                      component='span'
                      variant='body2'
                      color='textSecondary'>
            {formatToSecondary(v.changedAt)}
          </Typography>
          <Typography className={clsx(classes.valueColumn, classes.value)}
                      component='span'
                      variant='body2'
                      color='primary'>
            {v.value}
          </Typography>
          <Typography className={classes.occurrence}
                      component='span'
                      variant='body2'
                      color='textSecondary'>
            {v.occurrenceCount}x
          </Typography>
        </Box>
      )}
    </DialogContent>
  )
}

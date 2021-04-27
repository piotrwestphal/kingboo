import { createStyles, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      letterSpacing: '1px',
      fontWeight: 400,
    },
    subtitle: {
      letterSpacing: '-0.7px',
    },
  }),
)

interface HeaderTitleProps {
  readonly title: string
  readonly subtitle: string | null
}

export default function HeaderTitle({ title, subtitle }: HeaderTitleProps) {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.title}
                  variant="body1"
                  color="primary"
                  component="span">{title}</Typography>
      {subtitle && <Typography className={classes.subtitle}
                               variant="body2"
                               noWrap
                               color="textSecondary"
                               component="span"> [{subtitle}]</Typography>
      }
    </>
  )
}

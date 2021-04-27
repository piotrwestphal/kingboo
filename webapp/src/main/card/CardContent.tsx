import { useState } from 'react'
import { Box, CardContent as MCardContent, createStyles, Theme, Typography } from '@material-ui/core'
import { TopHotelsDto } from '../../core/dto/top-hotels.dto'
import { makeStyles } from '@material-ui/core/styles'
import { createHotelList } from './hotel/create-hotel-list'
import { SearchData } from '../../core/search-data'
import HotelsSelector from './content/HotelsSelector'
import Block from './Block'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    empty: {
      paddingBottom: theme.spacing( 0.5),
    },
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingBottom: theme.spacing(2),
    },
    selector: {
      marginRight: theme.spacing(3),
    },
  }),
)

interface SearchContentProps {
  readonly searchData: SearchData
}

export default function CardContent({
                                      searchData: {
                                        collectingFinishedAt,
                                        topHotels
                                      }
                                    }: SearchContentProps) {
  const classes = useStyles()
  const [item, setItem] = useState<keyof TopHotelsDto>('bestPriceRate')

  const empty =
    <Typography className={classes.empty}
                component="p"
                variant='body2'
                color='textSecondary'>
      There are no collected hotels or search is outdated
    </Typography>

  return (
    <MCardContent style={{ paddingBottom: '4px' }} className={classes.root}>
      {!topHotels
        ? empty
        : <>
          <Box className={classes.container}>
            <HotelsSelector className={classes.selector}
                            selectedHotels={item}
                            selectHotels={setItem}/>
            {<Block value={collectingFinishedAt} description='Last collected at'/>}
          </Box>
          {createHotelList(topHotels, item)}
        </>
      }
    </MCardContent>
  )
}

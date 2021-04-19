import { Dispatch } from 'react'
import * as React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import PersonIcon from '@material-ui/icons/Person'
import RepeatIcon from '@material-ui/icons/Repeat'
import { makeStyles } from '@material-ui/core/styles'
import { Button, createStyles, Grid, Theme } from '@material-ui/core'
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha'
import TodayIcon from '@material-ui/icons/Today'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { SortByOptions } from './sort-by.options'
import { sortByValue } from './sort-by.value'
import { SearchRequestType } from '../../core/SearchRequestType'
import { FilterAction } from './filter.reducer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(0.3),
    },
  }),
)

interface FiltersProps {
  readonly filterDispatch: Dispatch<FilterAction>
  readonly sortBy: SortByOptions
  readonly filterBy: SearchRequestType | null
}

export default function Toolbar({
                                  filterDispatch,
                                  filterBy,
                                  sortBy,
                                }: FiltersProps) {
  const classes = useStyles()
  const scrollUp = () => window.scrollTo(0, 0)

  const sortChange = (event: React.MouseEvent, value: SortByOptions) => {
    if (value) { // prevent null assignment
      filterDispatch({ type: 'sort', payload: { sortBy: value, reverse: false } })
    } else {
      filterDispatch({ type: 'reverse' })
    }
  }

  const filterChange = (event: React.MouseEvent, value: SearchRequestType | null) => {
    filterDispatch({type: 'filter', payload: value})
  }
  return (
    <Grid className={classes.container}
          justify="space-between"
          container>
      <ToggleButtonGroup aria-label='search type'
                         exclusive
                         value={filterBy}
                         onChange={filterChange}>
        <ToggleButton value={SearchRequestType.USER} aria-label="user">
          <PersonIcon color='action'/>
        </ToggleButton>
        <ToggleButton value={SearchRequestType.CYCLIC} aria-label="cyclic">
          <RepeatIcon color='action'/>
        </ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={scrollUp}>
        <ExpandLessIcon color='disabled'/>
      </Button>
      <ToggleButtonGroup aria-label='sort by'
                         exclusive
                         value={sortBy}
                         onChange={sortChange}>
        <ToggleButton value={sortByValue.place} aria-label="search place">
          <SortByAlphaIcon color='action'/>
        </ToggleButton>
        <ToggleButton value={sortByValue.date} aria-label="check in date">
          <TodayIcon color='action'/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>

  )
}

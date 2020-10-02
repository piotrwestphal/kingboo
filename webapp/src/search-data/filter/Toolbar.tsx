import React, { Dispatch, SetStateAction } from 'react';
import { SearchType } from '../../core/SearchType';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PersonIcon from '@material-ui/icons/Person';
import RepeatIcon from '@material-ui/icons/Repeat';
import { makeStyles } from '@material-ui/core/styles';
import { Button, createStyles, Grid, Theme } from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import TodayIcon from '@material-ui/icons/Today';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { SortByOptions } from './sort-by.options';
import { sortByValue } from './sort-by.value';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(0.3),
    },
  }),
);

interface FiltersProps {
  readonly type: SearchType | null;
  readonly setType: Dispatch<SetStateAction<SearchType | null>>;
  readonly sortBy: SortByOptions;
  readonly setSortBy: Dispatch<SetStateAction<SortByOptions>>;
  readonly setReverse: Dispatch<SetStateAction<boolean>>;
}

export default function Toolbar({
                                  type,
                                  setType,
                                  sortBy,
                                  setSortBy,
                                  setReverse,
                                }: FiltersProps) {
  const classes = useStyles();
  const scrollUp = () => window.scrollTo(0, 0)

  const sortChange = (event: React.MouseEvent, value: SortByOptions) => {
    if (value) { // prevent null assignment
      setSortBy(value)
      setReverse(false)
    } else {
      setReverse((current) => !current)
    }
  }
  return (
    <Grid className={classes.container}
          justify="space-between"
          container>
      <ToggleButtonGroup aria-label='search type'
                         exclusive
                         value={type}
                         onChange={(event, value: SearchType | null) => setType(value)}>
        <ToggleButton value={SearchType.USER} aria-label="user">
          <PersonIcon color='action'/>
        </ToggleButton>
        <ToggleButton value={SearchType.CYCLIC} aria-label="cyclic">
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

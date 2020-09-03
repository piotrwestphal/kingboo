import React, { Dispatch, SetStateAction } from 'react';
import { SearchType } from '../../core/SearchType';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import PersonIcon from '@material-ui/icons/Person';
import ReplayIcon from '@material-ui/icons/Replay';
import { makeStyles } from '@material-ui/core/styles';
import { Button, createStyles, Grid, Theme } from '@material-ui/core';
import { SearchDataDto } from '../../core/search-data.dto';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import TodayIcon from '@material-ui/icons/Today';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

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
  readonly sortBy: keyof SearchDataDto;
  readonly setSortBy: Dispatch<SetStateAction<keyof SearchDataDto>>;
}

export default function Filters({
                                  type,
                                  setType,
                                  sortBy,
                                  setSortBy
                                }: FiltersProps) {
  const classes = useStyles();
  const scrollUp = () => window.scrollTo(0, 0)
  return (
    <Grid className={classes.container}
          justify="space-between"
          container>
      <ToggleButtonGroup aria-label='search type'
                         exclusive
                         value={type}
                         onChange={(event, value: SearchType | null) => setType(value)}>
        <ToggleButton value={SearchType.USER} aria-label="user">
          <PersonIcon/>
        </ToggleButton>
        <ToggleButton value={SearchType.CYCLIC} aria-label="cyclic">
          <ReplayIcon/>
        </ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={scrollUp}>
        <ExpandLessIcon color='disabled'/>
      </Button>
      <ToggleButtonGroup aria-label='sort by'
                         exclusive
                         value={sortBy}
                         onChange={(event, value: keyof SearchDataDto) => {
                           if (value) { // prevent null assignment
                             setSortBy(value)
                           }
                         }}>
        <ToggleButton value={'searchPlace' as keyof SearchDataDto} aria-label="search place">
          <SortByAlphaIcon/>
        </ToggleButton>
        <ToggleButton value={'checkInDate' as keyof SearchDataDto} aria-label="check in date">
          <TodayIcon/>
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>

  )
}

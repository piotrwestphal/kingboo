import React, { useEffect, useReducer, useState } from 'react';
import { createStyles, Divider, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from './card/Card';
import Toolbar from './filter/Toolbar';
import { common } from '@material-ui/core/colors';
import { sort } from '../util/sorter';
import { SearchData } from '../core/search-data';
import { filterReducer, initialFilterState } from './filter/filter.reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarWrapper: {
      zIndex: 1,
      position: 'sticky',
      backgroundColor: common.white,
      top: theme.spacing(0),
    },
    list: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: 0,
      }
    }
  }),
);

interface SearchCardListProps {
  readonly list: SearchData[];
}

export default function CardList({ list: sourceList }: SearchCardListProps) {
  const classes = useStyles();
  const [{ sortBy, filterBy, reverse }, filterDispatch] = useReducer(filterReducer, initialFilterState)

  const initialList = sort(sourceList, sortBy.primaryKey, sortBy.secondaryKey, reverse)
  const [list, setList] = useState<SearchData[]>(initialList)

  useEffect(() => {
    setList(() => {
      const filteredList = filterBy
        ? sourceList.filter((v) => v.type === filterBy)
        : sourceList
      return sort(filteredList, sortBy.primaryKey, sortBy.secondaryKey, reverse)
    })
  }, [filterBy, sortBy, reverse, sourceList])

  return (
    <>
      <div className={classes.toolbarWrapper}>
        <Toolbar filterDispatch={filterDispatch}
                 sortBy={sortBy}
                 filterBy={filterBy}/>
        <Divider/>
      </div>
      <Grid container className={classes.list} spacing={1}>
        {list.map((searchData) =>
          <Grid key={searchData.searchId} item xs={12} md={6}>
            <Card searchData={searchData}/>
          </Grid>
        )}
      </Grid>
    </>
  );
}

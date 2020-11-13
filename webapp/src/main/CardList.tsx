import React, { useEffect, useState } from 'react';
import { createStyles, Divider, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from './card/Card';
import Toolbar from './filter/Toolbar';
import { common } from '@material-ui/core/colors';
import { SortByOptions } from './filter/sort-by.options';
import { sort } from '../util/sorter';
import { sortByValue } from './filter/sort-by.value';
import { SearchData } from '../core/search-data';
import { SearchRequestType } from '../core/SearchRequestType';

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
  const [type, setType] = useState<SearchRequestType | null>(null)
  const [sortBy, setSortBy] = useState<SortByOptions>(sortByValue.place)
  const [reverse, setReverse] = useState<boolean>(false)

  const initialList = sort(sourceList, sortBy.primaryKey, sortBy.secondaryKey, reverse)
  const [list, setList] = useState<SearchData[]>(initialList)

  useEffect(() => {
    setList(() => {
      const filteredList = type
        ? sourceList.filter((v) => v.type === type)
        : sourceList
      return sort(filteredList, sortBy.primaryKey, sortBy.secondaryKey, reverse)
    })
  }, [type, sortBy, reverse, sourceList])

  return (
    <>
      <div className={classes.toolbarWrapper}>
        <Toolbar type={type}
                 setType={setType}
                 sortBy={sortBy}
                 setSortBy={setSortBy}
                 setReverse={setReverse}/>
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

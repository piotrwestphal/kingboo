import React, { useEffect, useState } from 'react';
import { createStyles, Divider, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchCard from './card/SearchCard';
import { SearchDataDto } from '../core/search-data.dto';
import { SearchType } from '../core/SearchType';
import Filters from './filter/Filters';
import { common } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
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
  readonly list: SearchDataDto[];
}

export default function SearchCardList({ list: sourceList }: SearchCardListProps) {
  const classes = useStyles();
  const [type, setType] = useState<SearchType | null>(null)
  const [sortBy, setSortBy] = useState<keyof SearchDataDto>('checkInDate')
  const [list, setList] = useState<SearchDataDto[]>(sourceList)

  useEffect(() => {
    if (!type) {
      setList(sourceList)
    } else {
      const filteredList = sourceList.filter((v) => v.type === type)
      setList(filteredList)
    }
  }, [sourceList, type])

  useEffect(() => {
    setList((currentList) => [...currentList].sort(
      ({ [sortBy]: a }, { [sortBy]: b }) => a > b ? 1 : a < b ? -1 : 0))
  }, [sourceList, sortBy])

  return (
    <>
      <div className={classes.header}>
        <Filters type={type}
                 setType={setType}
                 sortBy={sortBy}
                 setSortBy={setSortBy}/>
        <Divider/>
      </div>
      <Grid container className={classes.list} spacing={1}>
        {list.map((searchData) =>
          <Grid key={searchData.searchId} item xs={12} md={6}>
            <SearchCard searchDataDto={searchData}/>
          </Grid>
        )}
      </Grid>
    </>
  );
}

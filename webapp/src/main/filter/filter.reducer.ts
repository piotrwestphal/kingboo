import { SearchRequestType } from '../../core/SearchRequestType';
import { SortByOptions } from './sort-by.options';
import { Reducer } from 'react';
import { sortByValue } from './sort-by.value';

type FilterActionType = 'filter' | 'sort' | 'reverse'

type SortPayload = {
  sortBy: SortByOptions,
  reverse: boolean
}

type FilterState = {
  filterBy: SearchRequestType | null,
  sortBy: SortByOptions,
  reverse: boolean,
}

export const initialFilterState: FilterState = {
  filterBy: null,
  sortBy: sortByValue.place,
  reverse: false,
}

export interface FilterAction {
  readonly type: FilterActionType
  readonly payload?: SearchRequestType | null | SortPayload
}

export const filterReducer: Reducer<FilterState, FilterAction> = (prevState, action) => {
  switch (action.type) {
    case 'filter':
      return {
        ...prevState,
        filterBy: action.payload as SearchRequestType,
      }
    case 'sort':
      const { sortBy, reverse } = action.payload as SortPayload
      return {
        ...prevState,
        sortBy,
        reverse,
      }
    case 'reverse':
      return {
        ...prevState,
        reverse: !prevState.reverse,
      }
  }
}

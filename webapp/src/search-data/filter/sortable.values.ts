import { SearchDataDto } from '../../core/search-data.dto';

export type SortableValues = Pick<SearchDataDto, 'checkInDate' | 'searchPlace'>

import { SearchDataDto } from '../../core/dto/search-data.dto';

export type SortableValues = Pick<SearchDataDto, 'checkInDate' | 'searchPlace'>

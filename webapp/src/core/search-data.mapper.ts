import { SearchDataDto } from './dto/search-data.dto';
import { SearchData } from './search-data';
import { formatToDateRange, formatToSecondary } from '../util/date-formatter';
import { SearchRequestType } from './SearchRequestType';

export const fromDto = ({
                          collectingFinishedAt,
                          type,
                          checkInDate,
                          checkOutDate,
                          ...rest
                        }: SearchDataDto): SearchData => ({
  ...rest,
  type: type as SearchRequestType,
  checkInDate,
  stayDate: formatToDateRange(checkInDate, checkOutDate),
  collectingFinishedAt: collectingFinishedAt ? formatToSecondary(collectingFinishedAt) : null
})

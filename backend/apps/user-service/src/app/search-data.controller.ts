import { Controller, Get } from '@nestjs/common';
import { SearchDataService } from './search-data.service';
import { SearchDataPayload } from './dto/search-data.payload';

@Controller('api/v1/search-data')
export class SearchDataController {

  constructor(
    private readonly searchDataService: SearchDataService,
  ) {
  }

  @Get()
  getSearchData(): Promise<SearchDataPayload> {
    return this.searchDataService.getSearchData();
  }
}

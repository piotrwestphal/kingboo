import { Controller, Get } from '@nestjs/common'
import { SearchDataService } from './search-data/search-data.service'
import { SearchDataPayload } from './search-data/search-data.payload'

/*
  TODO: proxy for search-queue-manager
  - https://github.com/nestjs/nest/issues/2357
  - https://stackoverflow.com/questions/58608556/how-to-proxy-an-endpoint-using-google-app-engine
 */
@Controller('api/v1/search-data')
export class SearchDataController {

  constructor(
    private readonly searchDataService: SearchDataService,
  ) {
  }

  @Get()
  getSearchData(): Promise<SearchDataPayload> {
    return this.searchDataService.getSearchData()
  }
}

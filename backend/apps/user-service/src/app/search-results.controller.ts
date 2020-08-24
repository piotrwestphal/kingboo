import { Controller, Get } from '@nestjs/common';
import { SearchResultsService } from './search-results.service';
import { SearchResultsDto } from './dto/search-results.dto';

@Controller('api/v1/search-results')
export class SearchResultsController {

  constructor(
    private readonly searchResultsService: SearchResultsService,
  ) {
  }

  @Get()
  getSearchResults(): Promise<SearchResultsDto> {
    return this.searchResultsService.getSearchResults();
  }
}

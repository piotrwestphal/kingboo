import { Body, Controller, Post } from '@nestjs/common';
import { CreateSearchRequest } from '../core/interface/create-search-request';
import { SearchRequestService } from '../core/abstract/search-request.service';
import { SearchRequest } from '../core/model/SearchRequest';

@Controller('api/v1/search-requests')
export class SearchRequestController {

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @Post()
  async send(@Body() createSearchRequest: CreateSearchRequest): Promise<SearchRequest> {
    console.log({createSearchRequest});
    return await this.searchRequestService.createSearchRequest('userId', createSearchRequest);
  }
}

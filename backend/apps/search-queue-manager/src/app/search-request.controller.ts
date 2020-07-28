import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchRequest } from '../core/model/SearchRequest';
import { SearchRequestService } from './search-request/search-request.service';
import { UserCreateSearchRequest } from './search-request/user-create-search-request';
import { CreateSearchRequestMapper } from './search-request/create-search-request.mapper';

@Controller('api/v1/search-requests')
export class SearchRequestController {

  private readonly createSearchRequestMapper: CreateSearchRequestMapper = new CreateSearchRequestMapper();

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @Post()
  async createByUser(@Body() userCreateSearchRequest: UserCreateSearchRequest): Promise<SearchRequest> {
    const createSearchRequest = this.createSearchRequestMapper.fromUserCreateSearchRequest(userCreateSearchRequest);
    return this.searchRequestService.createUserSearchRequest('userId', createSearchRequest);
  }

  @Get()
  async getAll(): Promise<SearchRequest[]> {
    return this.searchRequestService.findAll();
  }
}

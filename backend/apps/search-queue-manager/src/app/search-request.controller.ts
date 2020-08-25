import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchRequestService } from './search-request/search-request.service';
import { UserCreateSearchRequest } from './search-request/user-create-search-request';
import { CreateSearchRequestMapper } from './search-request/create-search-request.mapper';
import { SearchRequestDto } from '@kb/model';

@Controller('api/v1/search-requests')
export class SearchRequestController {

  private readonly createSearchRequestMapper: CreateSearchRequestMapper = new CreateSearchRequestMapper();

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @Post()
  async createByUser(@Body() userCreateSearchRequest: UserCreateSearchRequest): Promise<SearchRequestDto> {
    const createSearchRequest = this.createSearchRequestMapper.fromUserCreateSearchRequest(userCreateSearchRequest);
    return this.searchRequestService.createUserSearchRequest('userId', createSearchRequest);
  }

  @Get()
  async getSearchRequests(): Promise<SearchRequestDto[]> {
    return this.searchRequestService.findAll();
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { SearchRequestService } from './search-request/search-request.service'
import { UserCreateSearchRequest } from './search-request/user-create-search-request'
import { CreateSearchRequestMapper } from './search-request/create-search-request.mapper'
import { SearchRequestDto } from '@kb/model'
import { SearchRequestsDto } from '@kb/model/search-request/search-requests.dto'

@Controller('api/v1/search-requests')
export class SearchRequestController {

  private readonly createSearchRequestMapper: CreateSearchRequestMapper = new CreateSearchRequestMapper()

  constructor(
    private readonly searchRequestService: SearchRequestService,
  ) {
  }

  @Post()
  async createByUser(@Body() userCreateSearchRequest: UserCreateSearchRequest): Promise<SearchRequestDto> {
    const createSearchRequest = this.createSearchRequestMapper.fromUserCreateSearchRequest(userCreateSearchRequest)
    return this.searchRequestService.createUserSearchRequest('userId', createSearchRequest)
  }

  @Get()
  async getSearchRequests(): Promise<SearchRequestsDto> {
    return this.searchRequestService.findAll()
  }

  @Get(':searchId')
  async getSearchRequest(@Param('searchId') searchId: string): Promise<SearchRequestDto> {
    return this.searchRequestService.findOrFail(searchId)
  }
}

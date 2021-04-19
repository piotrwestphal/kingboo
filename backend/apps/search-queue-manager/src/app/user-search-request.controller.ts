import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserCreateSearchRequest } from './search-request/user-create-search-request'
import { SearchRequestDto, SearchRequestsDto } from '@kb/model'
import { SearchRequestService } from './search-request/search-request.service'
import { CreateSearchRequestMapper } from './search-request/create-search-request.mapper'

@Controller('api/v1/:user_id/search-requests')
export class UserSearchRequestController {

  constructor(
    private readonly createSearchRequestMapper: CreateSearchRequestMapper,
    private readonly searchRequestService: SearchRequestService,
  ) {
    // TODO: finish
  }

  @Post()
  async createByUser(@Param('user_id') userId: string,
                     @Body() userCreateSearchRequest: UserCreateSearchRequest): Promise<SearchRequestDto> {
    // TODO: create search request if not exist
    // TODO: assign search request to user
    const createSearchRequest = this.createSearchRequestMapper.fromUserCreateSearchRequest(userCreateSearchRequest)
    return this.searchRequestService.createUserSearchRequest('userId', createSearchRequest)
  }

  @Get()
  async getSearchRequests(@Param('user_id') userId: string): Promise<SearchRequestsDto> {
    // TODO: find all for user
    return this.searchRequestService.findAll()
  }
}

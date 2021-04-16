import { SearchRequestDto } from '@kb/model/search-request/search-request.dto'

export interface UserSearchRequestDto {
  readonly userId: string
  readonly dto: SearchRequestDto
}

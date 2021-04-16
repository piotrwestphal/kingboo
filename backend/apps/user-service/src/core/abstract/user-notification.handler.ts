import { SearchRequestDto } from '@kb/model'

export abstract class UserNotificationHandler {
  abstract updateSearchRequest(searchId: string, searchRequestDto: SearchRequestDto): Promise<void>

  abstract deleteSearchRequest(searchId: string): Promise<void>

  abstract updateTopHotels(searchId: string): Promise<void>
}

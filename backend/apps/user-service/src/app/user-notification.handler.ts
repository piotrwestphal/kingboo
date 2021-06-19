import { SearchRequestDto } from '@kb/model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserNotificationHandler {

  updateSearchRequest(searchId: string, searchRequestDto: SearchRequestDto): Promise<void> {
    // TODO: implement
    return Promise.resolve(undefined);
  }

  deleteSearchRequest(searchId: string): Promise<void> {
    // TODO: implement
    return Promise.resolve(undefined);
  }

  updateTopHotels(searchId: string): Promise<void> {
    // TODO: implement
    return Promise.resolve(undefined);
  }

  updatePlace(searchId: string): Promise<void> {
    // TODO: implement
    return Promise.resolve(undefined);
  }
}

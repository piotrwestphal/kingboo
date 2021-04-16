import { SearchRequestDto } from '@kb/model'

export abstract class UserNotificationSender {
  abstract notifyAboutCreatedUserSearchRequest(searchId: string, dto: SearchRequestDto): void

  abstract notifyAboutCreatedCyclicSearchRequest(searchId: string, dto: SearchRequestDto): void

  abstract notifyAboutDeletedCyclicSearchRequest(searchId: string): void

  abstract notifyAboutFinishedCollecting(searchId: string, dto: SearchRequestDto): void
}

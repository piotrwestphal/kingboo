import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserNotificationsMessagePattern } from '@kb/rabbit/message-pattern/UserNotificationsMessagePattern';
import { HotelsData, MqMessage, UserNotificationMessage } from '@kb/model';
import { logger } from '../logger';

@Controller()
export class UserNotificationsConsumer {

  @MessagePattern(UserNotificationsMessagePattern.HOTELS_COLLECTION_STARTED)
  async handleHotelsCollectionStarted(@Payload() { searchId }: MqMessage): Promise<void> {
    logger.debug(`Received message ${UserNotificationsMessagePattern.HOTELS_COLLECTION_STARTED} for [${searchId}]`)
  }

  @MessagePattern(UserNotificationsMessagePattern.HOTELS_COLLECTION_COMPLETED)
  async handleHotelsCollectionCompleted(@Payload() { searchId }: MqMessage): Promise<void> {
    logger.debug(`Received message ${UserNotificationsMessagePattern.HOTELS_COLLECTION_COMPLETED} for [${searchId}]`)
  }

  @MessagePattern(UserNotificationsMessagePattern.HOTELS_PROCESSING_COMPLETED)
  async handleHotelsProcessingCompleted(@Payload() { searchId, data }: UserNotificationMessage<HotelsData>): Promise<void> {
    logger.debug(`Received message ${UserNotificationsMessagePattern.HOTELS_PROCESSING_COMPLETED} for [${searchId}]`, data)
  }
}

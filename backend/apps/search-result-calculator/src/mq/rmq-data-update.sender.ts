import { DataUpdateSender } from '../core/abstract/data-update.sender'
import { ClientProxy } from '@nestjs/microservices'
import { CollectingTimesDto, MqMessage } from '@kb/model'
import { DataUpdatesMessagePattern } from '@kb/rabbit/message-pattern/DataUpdatesMessagePattern'

export class RmqDataUpdateSender extends DataUpdateSender {
  constructor(
    private readonly client: ClientProxy,
  ) {
    super()
  }

  notifyAboutHotelsProcessingFinished(searchId: string,
                                      collectingStartedAt: string,
                                      collectingFinishedAt: string): void {
    this.client.emit<void, MqMessage<CollectingTimesDto>>(DataUpdatesMessagePattern.HOTELS_PROCESSING_COMPLETED, {
      searchId,
      timestamp: Date.now(),
      data: {
        collectingStartedAt,
        collectingFinishedAt,
      }
    })
  }
}

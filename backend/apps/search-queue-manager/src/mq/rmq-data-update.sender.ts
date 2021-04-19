import { ClientProxy } from '@nestjs/microservices'
import { MqMessage } from '@kb/model'
import { DataUpdateSender } from '../core/abstract/data-update.sender'
import { DataUpdatesMessagePattern } from '@kb/rabbit'

export class RmqDataUpdateSender extends DataUpdateSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super()
  }

  notifyAboutDeletedSearchRequest(searchId: string): void {
    this.client.emit<void, MqMessage>(DataUpdatesMessagePattern.SEARCH_REQUEST_DELETED,
      { searchId, timestamp: Date.now() })
  }
}

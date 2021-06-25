import { ClientProxy } from '@nestjs/microservices'
import { CollectingScenarioType, MqMessage } from '@kb/model'
import { DataUpdateSender } from '../core/abstract/data-update.sender'
import { DataUpdatesMessagePattern } from '@kb/rabbit'
import { ScenarioDetailsDto } from '@kb/model'

export class RmqDataUpdateSender extends DataUpdateSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super()
  }

  notifyAboutDeletedSearchRequest(searchId: string, scenarioType: CollectingScenarioType): void {
    this.client.emit<void, MqMessage<ScenarioDetailsDto>>(DataUpdatesMessagePattern.SEARCH_REQUEST_DELETED,
      { searchId, data: { scenarioType }, timestamp: Date.now() })
  }
}

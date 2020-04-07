import { CollectingScenarioSender } from '../core/abstract/collecting-scenario.sender';
import { DataCollectionNotificationsMessagePattern } from '@kb/rabbit/message-pattern/DataCollectionNotificationsMessagePattern';
import { RmqClientProxy } from '@kb/rabbit/rmq.client.proxy';
import { SearchRequest } from '../core/model/SearchRequest';

export class RmqCollectingScenarioSender extends CollectingScenarioSender {

  constructor(
    private readonly client: RmqClientProxy<DataCollectionNotificationsMessagePattern, SearchRequest>,
  ) {
    super();
  }

  sendScenario(searchRequest: SearchRequest): void {
    this.client.emit(DataCollectionNotificationsMessagePattern.NEW_SCENARIO, searchRequest);
  }
}

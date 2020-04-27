import { CollectingScenarioSender } from '../core/abstract/collecting-scenario.sender';
import { SearchRequest } from '../core/model/SearchRequest';
import { CollectHotelsScenarioMessage } from '@kb/model/mqmessage/collect-hotels-scenario.message';
import { CollectHotelsScenarioMapper } from './mapper/collect-hotels-scenario.mapper';
import { CollectingScenarioMessagePattern } from '@kb/rabbit/message-pattern/CollectingScenarioMessagePattern';
import { ClientProxy } from '@nestjs/microservices';
import { logger } from '../logger';

export class RmqCollectingScenarioSender extends CollectingScenarioSender {

  constructor(
    private readonly client: ClientProxy,
  ) {
    super();
  }

  sendScenario(searchRequest: SearchRequest): void {
    const scenarioMsg = CollectHotelsScenarioMapper.fromSearchRequest(searchRequest);
    this.client.emit<void, CollectHotelsScenarioMessage>(CollectingScenarioMessagePattern.NEW_SCENARIO, scenarioMsg);
    logger.info(`Successfully send collecting scenario with id [${searchRequest.searchId}]`);
  }
}

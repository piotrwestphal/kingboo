import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CollectingScenarioMessagePattern } from '@kb/rabbit/message-pattern/CollectingScenarioMessagePattern';
import { CollectHotelsScenarioMessage } from '@kb/model/mqmessage/collect-hotels-scenario.message';
import { DataCollectorService } from '../core/abstract/data-collector.service';
import { CollectHotelsScenarioMapper } from './mapper/collect-hotels-scenario.mapper';
import { mqAck } from '@kb/rabbit';

@Controller()
export class CollectingScenarioConsumer {

  constructor(
    private readonly dataCollectorService: DataCollectorService,
  ) {
  }

  @MessagePattern(CollectingScenarioMessagePattern.NEW_SCENARIO)
  async handleHotelsCollectionCompleted(@Payload() {
                                          searchId,
                                          updateFrequencyMinutes,
                                          scenario,
                                          timestamp,
                                        }: CollectHotelsScenarioMessage,
                                        @Ctx() ctx: RmqContext): Promise<void> {
    const collectHotelsScenario = CollectHotelsScenarioMapper.fromMessage(scenario);
    await this.dataCollectorService.collectData(searchId, updateFrequencyMinutes, collectHotelsScenario, timestamp);
    mqAck(ctx);
  }
}

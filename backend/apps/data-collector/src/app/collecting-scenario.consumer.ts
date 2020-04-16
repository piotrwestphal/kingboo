import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CollectingScenarioMessagePattern } from '@kb/rabbit/message-pattern/CollectingScenarioMessagePattern';
import { CollectHotelsScenarioMessage } from '@kb/model/mqmessage/collect-hotels-scenario.message';
import { DataCollectorService } from '../core/abstract/data-collector.service';
import { CollectHotelsScenarioMapper } from './mapper/collect-hotels-scenario.mapper';

@Controller()
export class CollectingScenarioConsumer {

  constructor(
    private readonly dataCollectorService: DataCollectorService,
  ) {
  }

  @MessagePattern(CollectingScenarioMessagePattern.NEW_SCENARIO)
  async handleHotelsCollectionCompleted(@Payload() collectHotelsScenarioMsg: CollectHotelsScenarioMessage,
                                        @Ctx() context: RmqContext) {
    const collectHotelsScenario = CollectHotelsScenarioMapper.fromMessage(collectHotelsScenarioMsg);
    await this.dataCollectorService.collectData(collectHotelsScenario);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}

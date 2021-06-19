import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { CollectingScenarioMessagePattern } from '@kb/rabbit/message-pattern/CollectingScenarioMessagePattern'
import { CollectHotelsScenarioMessage } from '@kb/model/mqmessage/collect-hotels-scenario.message'
import { mqAck } from '@kb/rabbit'
import { CollectingScenarioProcessor } from './collecting-scenario.processor'

@Controller()
export class CollectingScenarioConsumer {

  constructor(
    private readonly collectingScenarioProcessor: CollectingScenarioProcessor,
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
    await this.collectingScenarioProcessor.process(searchId, updateFrequencyMinutes, scenario, timestamp)
    mqAck(ctx)
  }
}

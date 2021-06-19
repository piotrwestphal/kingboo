import { logger } from '../logger'
import { TimeHelper } from '@kb/util'
import { ScenarioRunners } from './scenario-runners'
import { CollectingScenarioExecutor } from './collecting-scenario.executor'
import { CollectingScenarioDto } from '@kb/model'
import { CollectingScenarioMapper } from './mapper/collecting-scenario.mapper'

export class CollectingScenarioProcessor {

  constructor(
    private readonly collectingScenarioExecutor: CollectingScenarioExecutor,
    private readonly collectingScenarioMapper: CollectingScenarioMapper,
    private readonly scenarios: ScenarioRunners,
  ) {
  }

  async process(searchId: string,
                updateFrequencyMinutes: number,
                {
                  searchPlaceIdentifier,
                  ...restOfCollectingScenarioDto
                }: CollectingScenarioDto,
                messageTimestamp: number): Promise<void> {
    const now = new Date()
    const oldMessage = this.isMessageOld(now, updateFrequencyMinutes, messageTimestamp)
    if (oldMessage) {
      logger.warn(`Scenario [${searchId}] could not be started due to time the message was sent. The message has expired. ` +
        `Update frequency minutes [${updateFrequencyMinutes}], message sent time [${new Date(messageTimestamp).toISOString()}], ` +
        `now [${now.toISOString()}].`)
    } else {
      try {
        const collectingScenario = this.collectingScenarioMapper.fromMessage(restOfCollectingScenarioDto)
        await this.collectingScenarioExecutor.execute(
          this.scenarios[collectingScenario.type], searchId, collectingScenario, searchPlaceIdentifier)
      } catch (err) {
        logger.error(`Error during processing scenario for searchId [${searchId}]`, err)
      }
    }
  }

  private isMessageOld = (now: Date,
                          updateFrequencyMinutes: number,
                          messageTimestamp: number): boolean =>
    (messageTimestamp + (updateFrequencyMinutes * TimeHelper.MINUTE_IN_MS)) < now.getTime()
}

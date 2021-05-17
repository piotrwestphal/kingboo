import { DataCollectorService } from '../core/abstract/data-collector.service'
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario'
import { Injectable } from '@nestjs/common'
import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository'
import { ScrapActivity } from '../core/model/ScrapActivity'
import { HotelsCollector } from './hotels.collector'
import { DataCollectionNotificationSender } from '../core/abstract/data-collection-notification.sender'
import { DataToProcessSender } from '../core/abstract/data-to-process.sender'
import { logger } from '../logger'
import { TimeHelper } from '@kb/util'

@Injectable()
export class AppDataCollectorService extends DataCollectorService {

  constructor(
    private readonly dataCollectionNotificationSender: DataCollectionNotificationSender,
    private readonly dataToProcessSender: DataToProcessSender,
    private readonly hotelsCollector: HotelsCollector,
    private readonly scrapActivityRepository: ScrapActivityRepository,
  ) {
    super()
  }

  async collectData(searchId: string,
                    updateFrequencyMinutes: number,
                    collectHotelsScenario: CollectHotelsScenario,
                    messageTimestamp: number): Promise<void> {
    try {
      const nowMs = Date.now()
      const oldMessage = this.isMessageOld(nowMs, updateFrequencyMinutes, messageTimestamp)
      if (oldMessage) {
        logger.warn(`Scenario [${searchId}] could not be started due to time the message was sent. The message has expired. ` +
          `Update frequency minutes [${updateFrequencyMinutes}], message sent time [${new Date(messageTimestamp).toISOString()}], ` +
          `now [${new Date(nowMs).toISOString()}].`)
      } else {
        const scrapActivity = new ScrapActivity(searchId)
        scrapActivity.start()
        const saved = await this.scrapActivityRepository.update(searchId, scrapActivity)
        const expectedNumberOfParts = await this.hotelsCollector.collectHotels(searchId, collectHotelsScenario)
        saved.finish()
        const { scrapingStartedAt, scrapingFinishedAt } = await this.scrapActivityRepository.update(searchId, saved)
        this.dataCollectionNotificationSender.notifyAboutHotelsCollectionCompleted(searchId, scrapingStartedAt, scrapingFinishedAt)
        logger.info(`Collecting data finish. Scrap started at [${scrapingStartedAt.toISOString()}], ` +
          `scrap finished at [${scrapingFinishedAt.toISOString()}].`)
        if (expectedNumberOfParts) {
          this.dataToProcessSender.sendHotelsSummary(searchId, expectedNumberOfParts, scrapingStartedAt, scrapingFinishedAt)
        }
      }
    } catch (err) {
      logger.error(`Error when collecting data for searchId [${searchId}]`, err)
    }
  }

  private isMessageOld = (now: number,
                          updateFrequencyMinutes: number,
                          messageTimestamp: number): boolean =>
    (messageTimestamp + (updateFrequencyMinutes * TimeHelper.MINUTE_IN_MS)) < now
}

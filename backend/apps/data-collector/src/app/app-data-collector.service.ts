import { DataCollectorService } from '../core/abstract/data-collector.service';
import { CollectHotelsScenario } from '../core/interface/collect-hotels-scenario';
import { Injectable } from '@nestjs/common';
import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository';
import { ScrapActivity } from '../core/model/ScrapActivity';
import { HotelsCollector } from './hotels.collector';
import { logger } from '../logger';
import { UserNotificationSender } from '../core/abstract/user-notification.sender';

@Injectable()
export class AppDataCollectorService extends DataCollectorService {

  constructor(
    private readonly hotelsCollector: HotelsCollector,
    private readonly scrapActivityRepository: ScrapActivityRepository,
    private readonly userNotificationSender: UserNotificationSender,
  ) {
    super();
  }

  async collectData(searchId: string,
                    updateFrequencyMinutes: number,
                    collectHotelsScenario: CollectHotelsScenario,
                    messageTimestamp: number): Promise<void> {
    const nowMs = Date.now();
    const oldMessage = this.isMessageOld(nowMs, updateFrequencyMinutes, messageTimestamp);
    if (oldMessage) {
      logger.warn(`Scenario [${searchId}] could not be started due to time the message was sent. The message has expired. ` +
        `Update frequency minutes [${updateFrequencyMinutes}], message sent time [${new Date(messageTimestamp).toISOString()}], ` +
        `now [${new Date(nowMs).toISOString()}].`)
    } else {
      const scrapActivity = new ScrapActivity(searchId);
      scrapActivity.start();
      const saved = await this.scrapActivityRepository.update(searchId, scrapActivity);
      this.userNotificationSender.notifyAboutHotelsCollectionStarted(searchId, saved.scrapStartedAt, saved.scrapFinishedAt)
      await this.hotelsCollector.collectHotels(searchId, collectHotelsScenario);
      saved.finish();
      const finished = await this.scrapActivityRepository.update(searchId, saved);
      this.userNotificationSender.notifyAboutHotelsCollectionCompleted(searchId, finished.scrapStartedAt, finished.scrapFinishedAt)
      logger.info(`Collecting data finish. Scrap started at [${finished.scrapStartedAt.toISOString()}], ` +
        `scrap finished at [${finished.scrapFinishedAt.toISOString()}].`);
    }
  }

  private isMessageOld = (now: number,
                          updateFrequencyMinutes: number,
                          messageTimestamp: number): boolean =>
    (messageTimestamp + (updateFrequencyMinutes * 1000 * 60)) < now;
}

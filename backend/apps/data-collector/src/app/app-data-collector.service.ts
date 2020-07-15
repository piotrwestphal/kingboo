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

  private readonly NETWORK_LATENCY_THRESHOLD_MINUTES = 1;

  constructor(
    private readonly hotelsCollector: HotelsCollector,
    private readonly scrapActivityRepository: ScrapActivityRepository,
    private readonly userNotificationSender: UserNotificationSender,
  ) {
    super();
  }

  async collectData(searchId: string,
                    updateFrequencyMinutes: number,
                    collectHotelsScenario: CollectHotelsScenario): Promise<void> {
    const nowMs = Date.now();
    const found = await this.scrapActivityRepository.find(searchId);
    if (found?.scrapStartedAt) {
      const eligibleToStart = this.isScenarioEligibleToStart(nowMs, found.scrapStartedAt, updateFrequencyMinutes);
      if (eligibleToStart) {
        await this.startCollecting(searchId, collectHotelsScenario, found);
      } else {
        logger.warn(`scenario could not be started due to too high data collection frequency.` +
          `Update frequency minutes [${updateFrequencyMinutes}], last start time [${found.scrapStartedAt}],` +
          `now [${new Date()}].`)
      }
    } else {
      const scrapActivity = new ScrapActivity(searchId);
      const created = await this.scrapActivityRepository.create(scrapActivity);
      await this.startCollecting(searchId, collectHotelsScenario, created);
    }
  }

  private isScenarioEligibleToStart(nowMs: number,
                                    scrapStartedAt: Date,
                                    updateFrequencyMinutes: number) {
    const lastStartedMs = scrapStartedAt.valueOf();
    const timeSinceLastStartMinutes = (nowMs - lastStartedMs) / 1000 / 60;
    return (timeSinceLastStartMinutes + this.NETWORK_LATENCY_THRESHOLD_MINUTES) > updateFrequencyMinutes;
  }

  private async startCollecting(searchId: string,
                                collectHotelsScenario: CollectHotelsScenario,
                                scrapActivity: ScrapActivity): Promise<void> {
    scrapActivity.start();
    const started = await this.scrapActivityRepository.update(scrapActivity);
    this.userNotificationSender.notifyAboutHotelsCollectionStarted(searchId, started.scrapStartedAt, started.scrapFinishedAt)
    await this.hotelsCollector.collectHotels(searchId, collectHotelsScenario);
    started.finish();
    const finished = await this.scrapActivityRepository.update(started);
    this.userNotificationSender.notifyAboutHotelsCollectionCompleted(searchId, finished.scrapStartedAt, finished.scrapFinishedAt)
    logger.info(`Collecting data finish. Scrap started at [${finished.scrapStartedAt}], ` +
      `scrap finished at [${finished.scrapFinishedAt}].`);
  }
}

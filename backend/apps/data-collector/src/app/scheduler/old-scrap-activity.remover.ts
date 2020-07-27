import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { logger } from '../../logger';
import { ScrapActivityRepository } from '../../core/abstract/scrap-activity.repository';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class OldScrapActivityRemover {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly scrapActivityRepository: ScrapActivityRepository,
  ) {
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'remove-old-scrap-activity',
  })
  async removeOldScrapActivity() {
    logger.debug(`Triggering job [remove-old-scrap-activity]`);
    const now = new Date();
    const days = this.appConfigService.scrapActivitiesWithoutUpdateStorageDays;
    const found = await this.scrapActivityRepository.findLastUpdatedGivenDaysAgo(now, days);
    if (found.length) {
      const deletedCount = await this.scrapActivityRepository.deleteMany(found);
      logger.info(`[${deletedCount}] scrap activities were deleted due to lack of updates for ` +
        `[${days}] days`);
      logger.debug('Deleted scrap activities: ', found);
    }
  }
}

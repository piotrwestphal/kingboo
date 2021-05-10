import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HotelRepository } from '../../core/abstract/hotel.repository';
import { AppConfigService } from '../../config/app-config.service';
import { logger } from '../../logger'
import { TimeHelper } from '@kb/util'

@Injectable()
export class OldHotelsRemover {

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly hotelRepository: HotelRepository,
  ) {
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'remove-old-hotels',
  })
  async removeOldHotels() {
    logger.debug(`Triggering job [remove-old-hotels]`);
    const now = new Date();
    const retentionDaysInMs = this.appConfigService.hotelsWithoutUpdateRetentionHours * TimeHelper.HOUR_IN_SEC;
    const found = await this.hotelRepository.findLastUpdatedGivenMsAgo(now, retentionDaysInMs);
    if (found.length) {
      const deletedCount = await this.hotelRepository.deleteMany(found);
      logger.info(`[${deletedCount}] hotels were deleted due to lack of updates for ` +
        `[${retentionDaysInMs}] days`);
      logger.debug('Deleted hotels identifiers: ', found);
    }
  }
}

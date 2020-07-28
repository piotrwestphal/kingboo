import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { logger } from '../../../../search-queue-manager/src/logger';
import { HotelRepository } from '../../core/abstract/hotel.repository';
import { AppConfigService } from '../../config/app-config.service';

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
    const days = this.appConfigService.hotelsWithoutUpdateStorageDays;
    const found = await this.hotelRepository.findLastUpdatedGivenDaysAgo(now, days);
    if (found.length) {
      const deletedCount = await this.hotelRepository.deleteMany(found);
      logger.info(`[${deletedCount}] hotels were deleted due to lack of updates for ` +
        `[${days}] days`);
      logger.debug('Deleted hotels identifiers: ', found);
    }
  }
}

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
  async calculateNextCycles() {
    logger.debug(`Triggering job [remove-old-hotels]`);
    const now = new Date();
    const found = await this.hotelRepository.findHotelsLastUpdatedGivenDaysAgo(
      now, this.appConfigService.hotelsWithoutUpdateStorageDays)
    if (found.length) {
      const deletedCount = await this.hotelRepository.deleteMany(found);
      logger.info(`[${deletedCount}] hotels were deleted due to lack of updates for ` +
        `[${this.appConfigService.hotelsWithoutUpdateStorageDays}] days`);
      logger.debug('Deleted hotels identifiers: ', found);
    }
  }
}

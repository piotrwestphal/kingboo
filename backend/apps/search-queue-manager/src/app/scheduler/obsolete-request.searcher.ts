import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { logger } from '../../logger';

@Injectable()
export class ObsoleteRequestSearcher {

  constructor(
    private readonly searchRequestRepository: SearchRequestRepository,
  ) {
  }

  // TODO: notify about changes
  @Cron(CronExpression.EVERY_5_MINUTES, {
    name: 'find-obsolete-cyclic-search-requests',
  })
  async findObsoleteCyclicSearchRequests() {
    logger.debug(`Triggering job [find-obsolete-cyclic-search-requests]`);
    const now = new Date();
    const found = await this.searchRequestRepository.findObsoleteCyclicRequests(now);
    if (found.length) {
      const searchIds = found.map(v => v.searchId);
      const deletedCount = await this.searchRequestRepository.deleteMany(searchIds);
      logger.info(`[${deletedCount}] cyclic search requests with ids [${searchIds}] were deleted due to obsolescence`);
    }
  }
}

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

  @Cron(CronExpression.EVERY_5_MINUTES, {
    name: 'find-obsolete-search-requests',
  })
  async findObsoleteSearchRequests() {
    logger.debug(`Triggering job [find-obsolete-search-requests]`);
    const found = await this.searchRequestRepository.findObsoleteCyclicRequests();
    if (found.length) {
      const searchIds = found.map(v => v.searchId);
      const deletedCount = await this.searchRequestRepository.deleteMany(searchIds);
      logger.info(`[${deletedCount}] cyclic search requests with ids [${searchIds}] were deleted due to obsolescence`);
    }
  }
}

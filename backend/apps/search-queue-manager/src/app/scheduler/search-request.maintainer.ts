import { Cron, CronExpression } from '@nestjs/schedule';
import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { logger } from '../../logger';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { SearchRequest } from '../../core/model/SearchRequest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchRequestMaintainer {

  constructor(
    private readonly searchRequestRepository: SearchRequestRepository,
  ) {
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'restore-free-status-to-search-requests',
  })
  restoreFreeStatusToSearchRequests() {
    const now = new Date();
    const occupancyThresholdMinutes = 15;
    logger.debug(`Triggering job [restore-free-status-to-search-requests]`);
    from(this.searchRequestRepository.findOccupiedLongerThanGivenThreshold(now, occupancyThresholdMinutes))
      .pipe(
        flatMap(v => v),
      ).subscribe(async (searchRequest: SearchRequest) => {
      const unblocked = searchRequest.unblock();
      const { searchId } = await this.searchRequestRepository.update(unblocked);
      logger.debug(`Unblock search request with id [${searchId}] ` +
        `due to exceeding occupancy threshold [${occupancyThresholdMinutes}] min`);
    });
  }
}

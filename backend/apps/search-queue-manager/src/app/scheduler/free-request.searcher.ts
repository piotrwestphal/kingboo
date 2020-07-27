import { Cron, CronExpression } from '@nestjs/schedule';
import { from } from 'rxjs';
import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { flatMap } from 'rxjs/operators';
import { CollectingScenarioSender } from '../../core/abstract/collecting-scenario.sender';
import { Injectable } from '@nestjs/common';
import { logger } from '../../logger';

@Injectable()
export class FreeRequestSearcher {

  constructor(
    private readonly collectingScenarioSender: CollectingScenarioSender,
    private readonly searchRequestRepository: SearchRequestRepository,
  ) {
  }

  // TODO: notify about changes
  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'find-free-search-requests',
  })
  findFreeSearchRequestsAndSend() {
    logger.debug(`Triggering job [find-free-search-requests]`);
    const now = new Date();
    from(this.searchRequestRepository.findFree(now)).pipe(
      flatMap(v => v),
    ).subscribe(async (searchRequest) => {
      const now = new Date();
      const blocked = searchRequest.scheduleNextSearch(now);
      const updated = await this.searchRequestRepository.update(blocked);
      logger.info(`Sending free scenario with search id [${searchRequest.searchId}]`);
      this.collectingScenarioSender.sendScenario(updated);
    });
  }
}

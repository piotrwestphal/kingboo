import { SearchRequestRepository } from '../../core/abstract/search-request.repository';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { from } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class ObsoleteRequestSearcher {

  // TODO: Search repeatable requests that are in the past and remove them
  constructor(
    private readonly searchRequestRepository: SearchRequestRepository,
  ) {
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'find-obsolete-search-requests',
  })
  findObsoleteSearchRequests() {
    console.debug(`Triggering job [find-obsolete-search-requests]`);
    from(this.searchRequestRepository.findObsolete()).pipe(
      flatMap(v => v),
    ).subscribe(async (searchRequest) => {
      // TODO: delete repeatable request when obsolete
      console.warn(`Search request with id [${searchRequest.searchId}] is obsolete`)
    });
  }
}

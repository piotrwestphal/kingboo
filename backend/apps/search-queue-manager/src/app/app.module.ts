import { Module } from '@nestjs/common';
import { SearchRequestService } from './search-request/search-request.service';
import { DbModule } from '../db/db.module';
import { MqModule } from '../mq/mq.module';
import { ConfigModule } from '@kb/config';
import { getEnvironments } from '../config/environments';
import { AppConfigService } from '../config/app-config.service';
import { SearchRequestController } from './search-request.controller';
import { SearchRequestFactory } from './search-request/search-request.factory';
import { SearchIdentifierBuilder } from '../core/search-identifier.builder';
import { DataCollectionNotificationConsumer } from './data-collection-notification.consumer';
import { ScheduleModule } from '@nestjs/schedule';
import { FreeRequestSearcher } from './scheduler/free-request.searcher';
import { CyclicSearchService } from './cyclic-search/cyclic-search.service';
import { CycleStartFinder } from './calculate-cycle/cycle-start.finder';
import { CyclicSearchRepository } from '../core/abstract/cyclic-search.repository';
import { CyclicIdentifierBuilder } from '../core/cyclic-identifier.builder';
import { CyclicSearchFactory } from './cyclic-search/cyclic-search.factory';
import { CollectingScenarioSender } from '../core/abstract/collecting-scenario.sender';
import { SearchRequestRepository } from '../core/abstract/search-request.repository';
import { UserNotificationSender } from '../core/abstract/user-notification.sender';
import { ObsoleteRequestSearcher } from './scheduler/obsolete-request.searcher';
import { CycleCalculator } from './calculate-cycle/cycle.calculator';
import { CycleWatcher } from './scheduler/cycle.watcher';
import { CreateSearchRequestMapper } from './search-request/create-search-request.mapper';
import { DifferenceFinder } from './calculate-cycle/difference.finder';
import { CyclicSearchController } from './cyclic-search.controller';
import { DifferenceResolver } from './calculate-cycle/difference.resolver';
import { CyclicSearchMaintainer } from './scheduler/cyclic-search.maintainer';

@Module({
  imports: [
    ConfigModule.register(getEnvironments(), { configClass: AppConfigService }),
    DbModule,
    MqModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    CycleWatcher,
    CyclicSearchMaintainer,
    FreeRequestSearcher,
    ObsoleteRequestSearcher,
    {
      provide: CyclicSearchService,
      useFactory: (
        cycleCalculator: CycleCalculator,
        cyclicSearchRepository: CyclicSearchRepository,
      ) => {
        const cyclicIdentifierBuilder = new CyclicIdentifierBuilder();
        const cyclicSearchFactory = new CyclicSearchFactory(cyclicIdentifierBuilder);
        return new CyclicSearchService(
          cycleCalculator,
          cyclicSearchFactory,
          cyclicSearchRepository,
        );
      },
      inject: [CycleCalculator, CyclicSearchRepository],
    },
    {
      provide: SearchRequestService,
      useFactory: (
        collectingScenarioSender: CollectingScenarioSender,
        searchRequestRepository: SearchRequestRepository,
        userNotificationSender: UserNotificationSender,
      ) => {
        const searchIdentifierBuilder = new SearchIdentifierBuilder();
        const searchRequestFactory = new SearchRequestFactory(searchIdentifierBuilder);
        return new SearchRequestService(
          collectingScenarioSender,
          searchRequestFactory,
          searchRequestRepository,
          userNotificationSender,
        );
      },
      inject: [CollectingScenarioSender, SearchRequestRepository, UserNotificationSender],
    },
    {
      provide: CycleCalculator,
      useFactory: (
        cyclicSearchRepository: CyclicSearchRepository,
        searchRequestRepository: SearchRequestRepository,
        searchRequestService: SearchRequestService,
      ) => {
        const createSearchRequestMapper = new CreateSearchRequestMapper();
        const cycleStartFinder = new CycleStartFinder();
        const differenceFinder = new DifferenceFinder();
        const differenceResolver = new DifferenceResolver(searchRequestRepository, searchRequestService);
        return new CycleCalculator(
          createSearchRequestMapper,
          cycleStartFinder,
          cyclicSearchRepository,
          differenceFinder,
          differenceResolver,
          searchRequestRepository,
          searchRequestService,
        );
      },
      inject: [CyclicSearchRepository, SearchRequestRepository, SearchRequestService],
    },
  ],
  controllers: [
    CyclicSearchController,
    DataCollectionNotificationConsumer,
    SearchRequestController,
  ],
})
export class AppModule {

}

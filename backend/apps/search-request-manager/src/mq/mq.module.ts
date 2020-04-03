import { Module } from '@nestjs/common';
import { SearchRequestSender } from '../core/interface/search-request.sender';
import { ClientProxyFactory } from '@nestjs/microservices';
import { RMQSearchRequestSender } from './rmq.search-request.sender';
import { MainConfigService } from '../main-config.service';
import { CollectingScenarioSender } from '../core/interface/collecting-scenario.sender';
import { RmqCollectingScenarioSender } from './rmq.collecting-scenario.sender';

@Module({
  providers: [
    {
      provide: CollectingScenarioSender,
      useFactory: (config: MainConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.dataCollectorMqClient);
        return new RmqCollectingScenarioSender(clientProxy);
      },
      inject: [MainConfigService],
    },
    {
      provide: SearchRequestSender,
      useFactory: (config: MainConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.userServiceMqClient);
        return new RMQSearchRequestSender(clientProxy);
      },
      inject: [MainConfigService],
    },
  ],
  exports: [SearchRequestSender],
})
export class MqModule {
}

import { Module } from '@nestjs/common';
import { UserNotificationsSender } from '../core/abstract/user-notifications.sender';
import { ClientProxyFactory } from '@nestjs/microservices';
import { RmqUserNotificationsSender } from './rmq-user-notifications.sender';
import { AppConfigService } from '../config/app-config.service';
import { CollectingScenarioSender } from '../core/abstract/collecting-scenario.sender';
import { RmqCollectingScenarioSender } from './rmq-collecting-scenario.sender';

@Module({
  providers: [
    {
      provide: CollectingScenarioSender,
      useFactory: (config: AppConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.dataCollectionNotificationsMqClient);
        return new RmqCollectingScenarioSender(clientProxy);
      },
      inject: [AppConfigService],
    },
    {
      provide: UserNotificationsSender,
      useFactory: (config: AppConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.userNotificationsMqClient);
        return new RmqUserNotificationsSender(clientProxy);
      },
      inject: [AppConfigService],
    },
  ],
  exports: [UserNotificationsSender, CollectingScenarioSender],
})
export class MqModule {
}

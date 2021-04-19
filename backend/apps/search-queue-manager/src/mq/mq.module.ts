import { Module } from '@nestjs/common'
import { UserNotificationSender } from '../core/abstract/user-notification.sender'
import { ClientProxyFactory } from '@nestjs/microservices'
import { RmqUserNotificationSender } from './rmq-user-notification.sender'
import { AppConfigService } from '../config/app-config.service'
import { CollectingScenarioSender } from '../core/abstract/collecting-scenario.sender'
import { RmqCollectingScenarioSender } from './rmq-collecting-scenario.sender'
import { DataUpdateSender } from '../core/abstract/data-update.sender'
import { RmqDataUpdateSender } from './rmq-data-update.sender'

@Module({
  providers: [
    {
      provide: CollectingScenarioSender,
      useFactory: (config: AppConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.collectingScenarioMqClient)
        return new RmqCollectingScenarioSender(clientProxy)
      },
      inject: [AppConfigService],
    },
    {
      provide: DataUpdateSender,
      useFactory: (config: AppConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.dataUpdatesMqClient)
        return new RmqDataUpdateSender(clientProxy)
      },
      inject: [AppConfigService],
    },
    {
      provide: UserNotificationSender,
      useFactory: (config: AppConfigService) => {
        const clientProxy = ClientProxyFactory.create(config.userNotificationsMqClient)
        return new RmqUserNotificationSender(clientProxy)
      },
      inject: [AppConfigService],
    },
  ],
  exports: [CollectingScenarioSender, DataUpdateSender, UserNotificationSender],
})
export class MqModule {
}

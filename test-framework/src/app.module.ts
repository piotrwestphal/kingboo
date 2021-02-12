import {Module} from '@nestjs/common';
import {DataCollectionNotificationConsumer} from "./data-collection-notification-consumer";

@Module({
  controllers: [DataCollectionNotificationConsumer],
})
export class AppModule {
}

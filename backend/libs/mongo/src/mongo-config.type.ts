import { MongoConfigService } from '@kb/mongo/mongo-config.service';
import { MongoConfig } from '@kb/mongo/mongo.config';
import { CommonLoggerService } from '@kb/logger';

export interface MongoConfigType<T extends MongoConfigService> {
  new(config: MongoConfig, logger: CommonLoggerService): T;
}

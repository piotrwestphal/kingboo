import { MongoConfigService } from '@kb/mongo/mongo-config.service';
import { MongoConfig } from '@kb/mongo/mongo.config';

export interface MongoConfigType<T extends MongoConfigService> {
  new(config: MongoConfig): T;
}

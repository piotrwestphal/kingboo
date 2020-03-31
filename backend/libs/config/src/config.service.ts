import { NodeEnv } from '@kb/config/config.retriever';
import * as Joi from '@hapi/joi';
import { SecretForDbNameNotFoundError } from '@kb/config/exception/SecretForDbNameNotFoundError';
import { FaunaAdminDbOptionsNotFoundError } from '@kb/config/exception/FaunaAdminDbOptionsNotFoundError';
import { ConfigOptions } from '@kb/config/model/config-options';
import { MqOptions } from '@kb/config/model/mq-options';
import { RMQQueueArguments, RMQQueueDefinition, RMQQueueOptions } from '@kb/config/model/rmq-definition';
import { DbOptions } from '@kb/config/model/db-options';
import { FaunaAdminDbOptions, FaunaDbSecrets } from '@kb/config/model/faunadb-definition';
import { QueueDefinitionNotFoundError } from '@kb/config/exception/QueueDefinitionNotFoundError';
import { RmqOptions } from '@nestjs/microservices';

export class ConfigService {

  readonly configOptions: ConfigOptions;

  constructor(configOptions: ConfigOptions) {
    this.configOptions = this.validateOptions(configOptions);
  }

  get env(): NodeEnv {
    return this.configOptions.nodeEnv;
  }

  get port(): number {
    return this.configOptions.port;
  }

  get corsOrigins(): string | string[] {
    return this.createCorsWhitelist(this.configOptions.corsOrigins);
  }

  get rmqClientOptions(): RmqOptions['options'] {
    return this.buildRmqOptionsOrFail(this.configOptions.mq, 'rmqClientQueue');
  }

  get rmqConsumerOptions(): RmqOptions['options'] {
    return this.buildRmqOptionsOrFail(this.configOptions.mq, 'rmqConsumerQueue');
  }

  private buildRmqOptionsOrFail(mqOptions: MqOptions,
                                mqDefinitionKey: keyof Omit<MqOptions, 'rmqAddress'>) {
    const mqDefinition = mqOptions[mqDefinitionKey];
    if (!mqDefinition.queue) {
      throw new QueueDefinitionNotFoundError(mqDefinitionKey);
    }
    return {
      urls: [mqOptions.rmqAddress],
      ...mqDefinition,
    };
  }

  public getFaunaSecretOrFail(dbName: string) {
    const secret = this.configOptions.db?.faunaDbSecrets?.[dbName];
    if (!secret) {
      throw new SecretForDbNameNotFoundError(dbName);
    }
    return secret;
  }

  public getFaunaAdminDbOptionsOrFail(): FaunaAdminDbOptions {
    const options = this.configOptions.db?.faunaAdminDb;
    if (!options) {
      throw new FaunaAdminDbOptionsNotFoundError();
    }
    return options;
  }

  private validateOptions(configOptions: ConfigOptions): ConfigOptions {
    const generateRmqQueueSchema = () => Joi.object<RMQQueueDefinition>({
      queue: Joi.string().required(),
      prefetchCount: Joi.number().optional(),
      noAck: Joi.boolean().optional(),
      queueOptions: Joi.object<RMQQueueOptions>({
        autoDelete: Joi.boolean().optional(),
        durable: Joi.boolean().optional(),
        arguments: Joi.object<RMQQueueArguments>({
          'x-message-ttl': Joi.number().optional(),
        }).optional(),
      }).optional(),
    }).optional();
    const configOptionsSchema: Joi.ObjectSchema = Joi.object<ConfigOptions>({
      nodeEnv: Joi.string().valid('dev', 'prod', 'ci', 'local').required(),
      port: Joi.number().required(),
      corsOrigins: Joi.string().required(),
      db: Joi.object<DbOptions>({
        faunaDbSecrets: Joi.object<FaunaDbSecrets>({
          kingboo: Joi.string().required(),
        }).optional(),
        faunaAdminDb: Joi.object<FaunaAdminDbOptions>({
          domain: Joi.string().required(),
          scheme: Joi.string().required(),
          port: Joi.number().required(),
          secret: Joi.string().required(),
        }).optional(),
      }).optional(),
      mq: Joi.object<MqOptions>({
        rmqAddress: Joi.string().required(),
        rmqConsumerQueue: generateRmqQueueSchema(),
        rmqClientQueue: generateRmqQueueSchema(),
      }).optional(),
    });

    const { error, value: validatedConfigOptions } = configOptionsSchema.validate(
      configOptions,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedConfigOptions;
  }

  private createCorsWhitelist = (raw: string): string | string[] => {
    const split = raw.split(',');
    if (split.length === 1) {
      return raw;
    }
    return split.map((v) => v.trim());
  };
}

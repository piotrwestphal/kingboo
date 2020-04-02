import { NodeEnv } from '@kb/config/config.provider';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { commonConfigValidationSchemaMap } from '@kb/config/validation.schema';
import { CommonConfig } from '@kb/config/model/common-config';

export abstract class ConfigService<T extends CommonConfig> {

  readonly config: T;

  protected constructor(config: T, schemaMap: SchemaMap<T>) {
    const concatSchemaMap = {
      ...commonConfigValidationSchemaMap,
      ...schemaMap,
    };
    this.config = this.validate(concatSchemaMap, config);
  }

  get env(): NodeEnv {
    return this.config.nodeEnv;
  }

  get port(): number {
    return this.config.port;
  }

  get corsOrigins(): string | string[] {
    return this.createCorsWhitelist(this.config.corsOrigins);
  }

  get mqConsumer(): RmqOptions {
    return buildRmqOptions(this.config.mqConsumer);
  }

  protected validate(schemaMap: SchemaMap, value: T): T {
    const { error, value: validated } = Joi.object<CommonConfig>(schemaMap).validate(
      value,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validated;
  }

  private createCorsWhitelist = (raw: string): string | string[] => {
    const split = raw.split(',');
    if (split.length === 1) {
      return raw;
    }
    return split.map((v) => v.trim());
  };
}

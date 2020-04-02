import { NodeEnv } from '@kb/config/config.retriever';
import { ObjectSchema } from '@hapi/joi';
import { CommonConfig } from '@kb/config/model/common-config';
import { RmqOptions } from '@nestjs/microservices';
import { buildRmqOptions } from '@kb/rabbit';
import { commonConfigValidationSchema } from '@kb/config/validation.schema';

export abstract class CommonConfigService {

  readonly commonConfig: CommonConfig;

  protected constructor(configOptions: CommonConfig) {
    this.commonConfig = this.validate(commonConfigValidationSchema, configOptions);
  }

  get env(): NodeEnv {
    return this.commonConfig.nodeEnv;
  }

  get port(): number {
    return this.commonConfig.port;
  }

  get corsOrigins(): string | string[] {
    return this.createCorsWhitelist(this.commonConfig.corsOrigins);
  }

  get mqConsumer(): RmqOptions {
    return buildRmqOptions(this.commonConfig.mqConsumer);
  }

  protected validate<T>(validationSchema: ObjectSchema, value: T): T {
    const { error, value: validated } = validationSchema.validate(
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

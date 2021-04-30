import * as Joi from '@hapi/joi'
import { ObjectSchema } from '@hapi/joi'
import { CassandraOptions } from '@kb/cassandra/cassandra-options'

export const cassandraValidationObjectSchema: ObjectSchema<CassandraOptions> = Joi.object<CassandraOptions>({
  keyspace: Joi.string().required(),
  cloud: Joi.object<CassandraOptions['cloud']>({
    secureConnectBundlePath: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  local: Joi.object<CassandraOptions['local']>({
    contactPoint: Joi.string().required(),
    localDataCenter: Joi.string().required(),
  }),
}).xor('cloud', 'local')

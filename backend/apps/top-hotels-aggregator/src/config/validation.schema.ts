import * as Joi from '@hapi/joi'
import { SchemaMap } from '@hapi/joi'
import { AppConfig } from './app.config'
import { MongoOptions, mongoValidationSchemaMap } from '@kb/mongo'
import { RabbitOptions, rabbitValidationSchemaMap } from '@kb/rabbit'
import { firestoreValidationObjectSchema } from '@kb/firestore'

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  firestore: firestoreValidationObjectSchema.required(),
  mongo: Joi.object<MongoOptions>(mongoValidationSchemaMap).required(),
  userNotificationsMqClient: Joi.object<RabbitOptions>(rabbitValidationSchemaMap).required(),
}

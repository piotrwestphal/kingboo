import * as Joi from '@hapi/joi'
import { SchemaMap } from '@hapi/joi'
import { AppConfig } from './app.config'
import { firestoreValidationObjectSchema } from '@kb/firestore'

export const appConfigValidationSchemaMap: SchemaMap<AppConfig> = {
  firestore: firestoreValidationObjectSchema.required(),
  searchRequestsResourceAddress: Joi.string().required(),
}

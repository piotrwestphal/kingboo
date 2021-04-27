import * as Joi from '@hapi/joi'
import { ObjectSchema } from '@hapi/joi'
import { FirestoreOptions } from '@kb/firestore'

export const firestoreValidationObjectSchema: ObjectSchema<FirestoreOptions> = Joi.object<FirestoreOptions>({
  projectId: Joi.string().required(),
  clientEmail: Joi.string(),
  rawClientKey: Joi.string(),
  emulator: Joi.object<FirestoreOptions['emulator']>({
    host: Joi.string().required(),
    port: Joi.number().required(),
  }),
}).xor('clientEmail', 'emulator')
  .xor('rawClientKey', 'emulator')
  .with('clientEmail', 'rawClientKey')

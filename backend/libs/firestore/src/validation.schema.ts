import * as Joi from '@hapi/joi'
import { ObjectSchema } from '@hapi/joi'
import { FirestoreOptions } from '@kb/firestore'

export const firestoreValidationObjectSchema: ObjectSchema<FirestoreOptions> = Joi.object<FirestoreOptions>({
  projectId: Joi.string().required(),
  serviceAccountKeyJson: Joi.string(),
  emulator: Joi.object<FirestoreOptions['emulator']>({
    host: Joi.string().required(),
    port: Joi.number().required(),
  }),
}).xor('serviceAccountKeyJson', 'emulator')
  .with('clientEmail', 'clientKey')

import * as Joi from '@hapi/joi'
import { ObjectSchema } from '@hapi/joi'
import { StorageOptions } from './storage-options'

export const storageValidationObjectSchema: ObjectSchema<StorageOptions> = Joi.object<StorageOptions>({
  local: Joi.object<StorageOptions['local']>({
    outputFolderPath: Joi.string().required(),
  }),
  remote: Joi.object<StorageOptions['remote']>({
    projectId: Joi.string().required(),
    bucketName: Joi.string().required(),
    clientEmail: Joi.string().required(),
    rawClientKey: Joi.string().required(),
  }),
}).xor('local', 'remote')

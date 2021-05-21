import { StorageOptions } from '@kb/storage/storage-options'
import { Storage } from '@google-cloud/storage'
import { parsePemKey } from '@kb/util'
import { CommonLoggerService } from '@kb/logger'
import { GcpStorageRepository } from '@kb/storage/gcp-storage.repository'
import { LocalStorageRepository } from '@kb/storage/local-storage.repository'

export const createGcpRepository = ({ projectId, bucketName, clientEmail, rawClientKey }: StorageOptions['remote'],
                                    logger: CommonLoggerService) => {
  const privateKey = parsePemKey(rawClientKey)
  const storage = createStorage(projectId, clientEmail, privateKey)
  const bucket = storage.bucket(bucketName)
  return new GcpStorageRepository(bucket, logger)
}

export const createFileRepository = ({ outputFolderPath }: StorageOptions['local'],
                                     logger: CommonLoggerService) =>
  new LocalStorageRepository(outputFolderPath, logger)

const createStorage = (projectId: string,
                       client_email: string,
                       private_key: string) => new Storage({
  projectId,
  credentials: {
    client_email,
    private_key,
  }
})

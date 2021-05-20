import { FileRepository } from './file.repository'
import { CommonLoggerService } from '@kb/logger'
import { Bucket } from '@google-cloud/storage'
import { TimeHelper } from '@kb/util'

export class GcpStorageRepository extends FileRepository {

  constructor(
    private readonly bucket: Bucket,
    private readonly logger: CommonLoggerService,
  ) {
    super();
  }

  async save(data: string, fileId: string, dataType: string, extension = 'json'): Promise<void> {
    const now = new Date()
    const dir = `${dataType}/${TimeHelper.getFormattedDirectoryShortDate(now)}`
    const file = this.bucket.file(`${dir}/${TimeHelper.getFormattedDate(now)}-${fileId}.${extension}`)
    try {
      await file.save(data)
      this.logger.debug(`File was saved on remote file system - filePath [${file.name}]`)
    } catch (err) {
      this.logger.error(`Error when saving file on remote file system - filePath [${file.name}]`, err)
    }
  }

  async findFilePath(fileId: string, dataType: string): Promise<string> {
    try {
      const [files] = await this.bucket.getFiles({ prefix: `${dataType}` })
      return files.map(v => v.name).find(v => v.includes(fileId))
    } catch (err) {
      this.logger.error(`Error when searching for file on remote file system - fileName [${fileId}]`, err)
    }
  }

  async get(filePath: string): Promise<string> {
    try {
      const [bufferedContent] = await this.bucket.file(filePath).download()
      return bufferedContent.toString()
    } catch (err) {
      this.logger.error(`Error when retrieving file from remote file system - filePath [${filePath}]`, err)
    }
  }

  async delete(filePath: string): Promise<void> {
    try {
      await this.bucket.file(filePath).delete()
      this.logger.debug(`File was deleted from remote file system - filePath [${filePath}]`)
    } catch (err) {
      this.logger.error(`Error when deleting from remote file system - filePath [${filePath}] `, err)
    }
  }
}

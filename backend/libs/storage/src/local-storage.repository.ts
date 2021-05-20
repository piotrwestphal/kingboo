import { FileRepository } from './file.repository'
import { TimeHelper } from '@kb/util'
import { CommonLoggerService } from '@kb/logger'
import * as fs from 'fs'

export class LocalStorageRepository extends FileRepository {

  constructor(
    private readonly OUTPUT_PATH: string,
    private readonly logger: CommonLoggerService,
  ) {
    super()
  }

  async save(data: string, fileId: string, dataType: string, extension = 'json'): Promise<void> {
    const now = new Date()
    const concatName = this.concatName(fileId, dataType)
    const filePath = `${this.OUTPUT_PATH}/${TimeHelper.getFormattedDate(now)}-${concatName}.${extension}`
    try {
      await fs.promises.writeFile(filePath, data)
      this.logger.debug(`File was saved on local file system - filePath [${filePath}]`)
    } catch (err) {
      this.logger.error(`Error when saving file on local file system - filePath [${filePath}]`, err)
    }
  }

  async findFilePath(fileId: string, dataType: string): Promise<string> {
    try {
      const results = await fs.promises.readdir(`${this.OUTPUT_PATH}`)
      const concatName = this.concatName(fileId, dataType)
      const filePath = results.find(v => v.includes(concatName))
      return `${this.OUTPUT_PATH}/${filePath}`
    } catch (err) {
      this.logger.error(`Error when searching for file on local file system - fileName [${fileId}]`, err)
    }
  }

  async get(filePath: string): Promise<string> {
    try {
      const bufferedContent = await fs.promises.readFile(filePath)
      return bufferedContent.toString()
    } catch (err) {
      this.logger.error(`Error when retrieving file from local file system - filePath [${filePath}]`, err)
    }
  }

  async delete(filePath: string): Promise<void> {
    try {
      await fs.promises.unlink(filePath)
      this.logger.debug(`File was deleted from local file system - filePath [${filePath}]`)
    } catch (err) {
      this.logger.error(`Error when deleting from local file system - filePath [${filePath}] `, err)
    }
  }

  private concatName(fileId: string, dataType: string): string {
    return `${dataType.toUpperCase()}-${fileId}`
  }
}


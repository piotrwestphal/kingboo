export abstract class FileRepository {
  abstract save(data: string, fileId: string, dataType: string, fileExtension?: string): Promise<void>
  abstract findFilePath(fileId: string, dataType: string): Promise<string>
  abstract get(filePath: string): Promise<string>
  abstract delete(filePath: string): Promise<void>
}

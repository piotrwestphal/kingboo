export interface StorageOptions {
  readonly local?: {
    readonly outputFolderPath: string
  }
  readonly remote?: {
    readonly projectId: string
    readonly bucketName: string
    readonly clientEmail: string
    readonly rawClientKey: string
  }
}

export interface CassandraOptions {
  readonly cloud?: {
    readonly secureConnectBundlePath: string
    readonly username: string
    readonly password: string
  }
  readonly local?: {
    readonly contactPoint: string
    readonly localDataCenter: string
  }
}

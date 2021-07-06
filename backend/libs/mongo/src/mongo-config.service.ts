export interface MongoConfigService {
  readonly mongoPrimaryAddress: string
  readonly mongoSecondaryAddress?: string
}

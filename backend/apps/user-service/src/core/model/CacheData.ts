type CacheDataValues<T> = Omit<CacheData<T>, 'updatedAt'>

export class CacheData<T> {
  constructor(
    readonly searchId: string,
    readonly collectingStartedAt: string,
    readonly collectingFinishedAt: string,
    readonly data: T,
    readonly updatedAt: Date,
  ) {
  }

  static create<T>({
                     searchId,
                     collectingStartedAt,
                     collectingFinishedAt,
                     data,
                   }: CacheDataValues<T>): CacheData<T> {
    return new CacheData<T>(
      searchId,
      collectingStartedAt,
      collectingFinishedAt,
      data,
      null,
    )
  }
}

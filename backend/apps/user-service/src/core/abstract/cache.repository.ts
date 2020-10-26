import { CacheData } from '../model/CacheData';

export abstract class CacheRepository<T> {
  abstract find(searchId: string): Promise<CacheData<T> | null>

  abstract findAll(): Promise<Array<CacheData<T>>>

  abstract create(searchRequestCache: CacheData<T>): Promise<CacheData<T>>

  abstract delete(searchId: string): Promise<boolean>

  abstract deleteMany(searchIds: string[]): Promise<number>
}

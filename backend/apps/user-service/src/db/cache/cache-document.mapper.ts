import { CacheDocument } from './search-request-cache.document'
import { SaveCache } from './save-cache'
import { CacheData } from '../../core/model/CacheData'

export class CacheDocumentMapper {
  toCacheData<T>({
                   searchId,
                   collectingStartedAt,
                   collectingFinishedAt,
                   data,
                   updatedAt,
                 }: CacheDocument<T>): CacheData<T> {
    return new CacheData<T>(
      searchId,
      collectingStartedAt,
      collectingFinishedAt,
      data,
      new Date(updatedAt),
    )
  }

  prepareForSave<T>({
                      searchId,
                      collectingStartedAt,
                      collectingFinishedAt,
                      data,
                    }: CacheData<T>): SaveCache<T> {
    return {
      searchId,
      collectingStartedAt,
      collectingFinishedAt,
      data,
    }
  }
}

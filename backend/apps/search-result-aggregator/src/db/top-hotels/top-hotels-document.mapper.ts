import { TopHotelsDocument } from './top-hotels.document'
import { Timestamp } from '@google-cloud/firestore'
import { IndexedTopHotels } from '@kb/model'
import { TimeHelper } from '@kb/util'

export class TopHotelsDocumentMapper {

  toDoc(
    searchId: string,
    collectingStartedAt: string,
    collectingFinishedAt: string,
    {
      orderIndex,
      bestPriceRate,
      cheapest,
      bestRate,
      bestLocation,
    }: IndexedTopHotels): TopHotelsDocument {
    return {
      searchId,
      docId: `${searchId}_${TimeHelper.twoDigitFormat(orderIndex)}`,
      collectingStartedAt,
      collectingFinishedAt,
      orderIndex,
      bestPriceRate,
      cheapest,
      bestRate,
      bestLocation,
      createdAt: Timestamp.now(),
    }
  }
}

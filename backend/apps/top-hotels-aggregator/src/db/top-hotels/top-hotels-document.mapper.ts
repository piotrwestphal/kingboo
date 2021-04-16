import { TopHotelsDocument } from './top-hotels.document'
import { TopHotels } from '../../core/interface/top-hotels'
import { Timestamp } from '@google-cloud/firestore'

export class TopHotelsDocumentMapper {

  toDoc(
    searchId: string,
    collectingStartedAt: string,
    collectingFinishedAt: string,
    {
      bestPriceRate,
      cheapest,
      bestRate,
      bestLocation,
    }: TopHotels): TopHotelsDocument {
    return {
      searchId,
      docId: searchId,
      collectingStartedAt,
      collectingFinishedAt,
      bestPriceRate,
      cheapest,
      bestRate,
      bestLocation,
      createdAt: Timestamp.now(),
    }
  }
}

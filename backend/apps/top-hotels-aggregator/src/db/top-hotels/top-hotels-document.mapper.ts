import { TopHotelsDocument } from './top-hotels.document'
import { Timestamp } from '@google-cloud/firestore'
import { TopHotelsDto } from '@kb/model'

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
    }: TopHotelsDto): TopHotelsDocument {
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

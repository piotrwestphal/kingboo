import { Timestamp } from '@google-cloud/firestore'
import { SimpleHotelDto } from '@kb/model'
import { PlaceDocument } from './place.document'

export class PlaceDocumentMapper {
  toDoc(
    searchId: string,
    collectingStartedAt: string,
    collectingFinishedAt: string,
    hotel: SimpleHotelDto): PlaceDocument {
    return {
      searchId,
      docId: searchId,
      collectingStartedAt,
      collectingFinishedAt,
      hotel,
      createdAt: Timestamp.now(),
    }
  }
}

import { FirestoreDocument } from '@kb/firestore'
import { SimpleHotelDto } from '@kb/model'

export interface PlaceDocument extends FirestoreDocument {
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
  readonly hotel: SimpleHotelDto
}

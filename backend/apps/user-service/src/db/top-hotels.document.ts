import { FirestoreDocument } from '@kb/firestore'
import { SimpleHotelDocument } from './simple-hotel.document'

export interface TopHotelsDocument extends FirestoreDocument {
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
  readonly cheapest: SimpleHotelDocument[]
  readonly bestPriceRate: SimpleHotelDocument[]
  readonly bestRate: SimpleHotelDocument[]
  readonly bestLocation: SimpleHotelDocument[]
}

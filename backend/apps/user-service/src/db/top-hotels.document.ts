import { FirestoreDocument } from '@kb/firestore'
import { IndexedTopHotels } from '@kb/model'
import { SimpleHotelDocument } from './simple-hotel.document'

type ChangedIndexedTopHotelsDto = Omit<IndexedTopHotels, 'cheapest' | 'bestPriceRate' | 'bestRate' | 'bestLocation'>

export interface TopHotelsDocument extends ChangedIndexedTopHotelsDto, FirestoreDocument {
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
  readonly cheapest: SimpleHotelDocument | null
  readonly bestPriceRate: SimpleHotelDocument | null
  readonly bestRate: SimpleHotelDocument | null
  readonly bestLocation: SimpleHotelDocument | null
}

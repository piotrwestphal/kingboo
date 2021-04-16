import { SimpleHotel } from '../../core/interface/simple-hotel'
import { FirestoreDocument } from '@kb/firestore'

export interface TopHotelsDocument extends FirestoreDocument {
  readonly collectingStartedAt: string
  readonly collectingFinishedAt: string
  readonly cheapest: SimpleHotel[]
  readonly bestPriceRate: SimpleHotel[]
  readonly bestRate: SimpleHotel[]
  readonly bestLocation: SimpleHotel[]
}

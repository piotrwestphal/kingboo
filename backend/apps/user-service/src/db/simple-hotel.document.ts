import { PriceChange, SimpleHotelDto } from '@kb/model'
import { Timestamp } from '@google-cloud/firestore'

type ChangedSimpleHotelDto = Omit<SimpleHotelDto, 'lastCollectedAt' | 'priceChanges'>

export interface SimpleHotelDocument extends ChangedSimpleHotelDto {
  readonly priceChanges: PriceChangeDocument[]
  readonly lastCollectedAt: Timestamp
}

interface PriceChangeDocument extends Omit<PriceChange, 'changedAt'> {
  readonly changedAt: Timestamp
}

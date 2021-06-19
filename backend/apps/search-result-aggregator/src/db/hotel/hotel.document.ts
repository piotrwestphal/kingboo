import { SimpleHotelDocument } from './simple-hotel.document'

export interface HotelDocument extends SimpleHotelDocument {
  readonly collectedAt: string[]
}

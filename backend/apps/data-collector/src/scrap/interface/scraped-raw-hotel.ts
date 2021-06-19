import { ScrapedRawRoom } from './scraped-raw-room'

export interface ScrapedRawHotel {
  readonly name: string
  readonly price: string | null
  readonly tax: string | null
  readonly distanceFromCenter: string | null
  readonly districtName: string
  readonly coords: string
  readonly hotelLink: string
  readonly roomName: string | null
  readonly rate: string | null
  readonly secondaryRate: string | null
  readonly secondaryRateType: string | null
  readonly numberOfReviews: string | null
  readonly starRating: number | null
  readonly newlyAdded: string | null
  readonly bonuses: string[] | null
  readonly rooms: ScrapedRawRoom[] | null
  readonly debug?: string
}

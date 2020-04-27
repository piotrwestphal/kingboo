import { HotelRepository } from '../core/abstract/hotel.repository';
import { FaunaClient } from '@kb/fauna-client';
import { Hotel } from '../core/model/hotel';
import { Expr, ExprArg, query as q, values } from 'faunadb';
import { HotelDocument } from './fauna/interface/hotel.document';
import { FaunaHotelDocumentMapper } from './fauna/fauna-hotel-document.mapper';
import Document = values.Document;

export class FaunaHotelRepository extends HotelRepository {

  constructor(
    private readonly hotelDocumentMapper: FaunaHotelDocumentMapper,
    private readonly faunaClient: FaunaClient,
  ) {
    super();
  }

  // TODO: test it - search index could not work
  async findAllBySearchIdAndHotelId(searchId: string, hotelIds: string[]): Promise<Map<string, Hotel>> {
    const searchMatchers: ExprArg[] = hotelIds.map(hotelId => this.searchMatcher(searchId, hotelId));
    const hotelDocs = await this.faunaClient.query<Document<HotelDocument>[]>(q.Map(
      q.Paginate(
        q.Union(
          ...searchMatchers, // or array? - try it
        ),
      ),
      q.Lambda('hotel', q.Get(q.Var('hotel'))),
      ),
    );
    const hotels = hotelDocs.map(h => this.hotelDocumentMapper.toHotel(h.data));
    return hotels.reduce((map, hotel) =>
        map.set(hotel.hotelId, hotel),
      new Map<string, Hotel>());
  }

  createAll(hotels: Hotel[]): Promise<Hotel[]> {
    return null;
  }

  updateAll(hotels: Hotel[]): Promise<Hotel[]> {
    return null;
  }

  private searchMatcher(searchId: string, hotelId: string): Expr {
    return q.Match(q.Index('hotel_by_search_id_and_hotel_id'), [searchId, hotelId]);
  }
}

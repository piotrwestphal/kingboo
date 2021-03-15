import { RawHotel } from '../../core/model/RawHotel';
import { Timestamp } from '@google-cloud/firestore';
import { LinksDocument } from './links.document';

export class LinksMapper {
  toDoc(docId: string,
        searchId: string,
        createdAt: Timestamp,
        rawHotels: RawHotel[]): LinksDocument {
    const links = rawHotels
      .reduce((prev, curr) => {
        prev[curr.hotelId] = curr.hotelLink
        return prev
      }, {} as Record<string, string>)
    return {
      docId,
      searchId,
      createdAt,
      links,
    }
  }
}

import { Injectable } from '@nestjs/common';
import { HotelRaw } from './interface/hotel.raw';
import { Room } from './interface/room';
import { SearchResult } from './interface/searchResult';
import { HotelWithId } from './interface/hotelWithId';

@Injectable()
export class HotelDataAggregatorService {

    /*public prepareSearchResult(searchId: string,
                               searchPerformedForPlace: string,
                               startSearchProcessTimeMs: number,
                               scrapingTimeSeconds: number,
                               hotelsRaw: HotelRaw[]): SearchResult {
        const searchProcessTimeSeconds = TimeHelper.getDiffTimeInSeconds(startSearchProcessTimeMs);
        const hotels = this.prepareHotelsToBeSavedToDB(hotelsRaw);
        return SearchResultBuilder.get()
            .searchId(searchId)
            .searchPerformedForPlace(searchPerformedForPlace)
            .scrapingTimeSeconds(scrapingTimeSeconds)
            .searchProcessTimeSeconds(searchProcessTimeSeconds)
            .hotelsCount(hotels.length)
            .hotels(hotels)
            .build();
    }

    private prepareHotelsToBeSavedToDB = (hotelsRaw: HotelRaw[]): HotelWithId[] =>
        hotelsRaw.map((h: HotelRaw) => HotelBuilder.get()
            .hotelId(this.assignHotelId(h))
            // following parameters should always exist - but if the filters have not been set, there may be no values
            .name(h.name)
            .price(h.price)
            .tax(h.tax)
            .distanceFromCenter(h.distanceFromCenter)
            .districtName(h.districtName)
            .coords(h.coords)
            .hotelLink(h.hotelLink)
            // following parameters might not be available
            .rate(h.rate)
            .secondaryRateType(h.secondaryRateType)
            .secondaryRate(h.secondaryRate)
            .priceWithoutDiscount(h.priceWithoutDiscount)
            .numberOfReviews(h.numberOfReviews)
            .propertyType(h.propertyType)
            .starRating(h.starRating)
            .newlyAdded(h.newlyAdded)
            .bonuses(h.bonuses)
            .rooms(h.rooms && h.rooms.length ? this.getRooms(h.rooms) : null)
            .build())

    private getRooms = (roomsRaw: Room[]) => roomsRaw.map(r => RoomBuilder.get()
        .description(r.description)
        .personCount(r.personCount)
        .beds(r.beds)
        .build())

    private assignHotelId = ({ name, coords }: HotelRaw) => {
        if (!coords) {
            console.error(`There is no coords param for hotel: ${name}`);
        }
        return Buffer.from(`${name}${coords ? coords : ''}`)
            .toString('base64');
    }*/
}

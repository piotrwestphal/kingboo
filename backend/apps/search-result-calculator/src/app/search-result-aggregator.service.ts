/*interface HotelWithHistoricalPrices extends HotelRaw {
  prices: ValueWithDate<{ price: string, tax: string }>[];
}

interface HotelsDetailsAndLastHotelsWithPrices {
  hotelsWithPrices: HotelWithHistoricalPrices[];
  searchResultsDetails: SearchResultDetails[];
}

@Injectable()
export class SearchResultAggregatorService {

    private readonly priceParser: PriceParser = new PriceParser();

    public async getSearchResultSummary(searchResultQueryCursor: QueryCursor<RawSearchResultDocument>): Promise<SearchResultSummaryDto | null> {
        const aggregatedSearchResults = await this.getLastHotelsWithHistoricalPrices(searchResultQueryCursor);
        if (!aggregatedSearchResults) {
            return null;
        }
        const {hotelsWithPrices, searchResultsDetails} = aggregatedSearchResults;
        const {first, last} = this.getDetailsRangesByCreatedAt(searchResultsDetails);
        const hotelsSummary = this.createHotelsSummary(hotelsWithPrices);
        const avgSearchProcessTimeSeconds = searchResultsDetails.map(v => v.searchProcessTimeSeconds)
            .reduce((v1, v2) => v1 + v2) / searchResultsDetails.length;
        const avgScrapingTimeSeconds = searchResultsDetails.map(v => v.scrapingTimeSeconds)
            .reduce((v1, v2) => v1 + v2) / searchResultsDetails.length;
        return SearchResultSummaryDtoBuilder.get()
            .searchId(last.searchId)
            .firstCreatedAt(first.createdAt)
            .lastCreatedAt(last.createdAt)
            .avgSearchProcessTimeSeconds(this.roundToTwoDecimalPlaces(avgSearchProcessTimeSeconds))
            .lastSearchProcessTimeSeconds(last.searchProcessTimeSeconds)
            .avgScrapingTimeSeconds(this.roundToTwoDecimalPlaces(avgScrapingTimeSeconds))
            .lastScrapingTimeSeconds(last.scrapingTimeSeconds)
            .resultsCount(searchResultsDetails.length)
            .hotelsSummary(hotelsSummary)
            .build();
    }

    private async getLastHotelsWithHistoricalPrices(searchResultQueryCursor: QueryCursor<RawSearchResultDocument>): Promise<HotelsDetailsAndLastHotelsWithPrices> {
        const pricesByHotelId: Map<string, ValueWithDate<{ price: string, tax: string }>[]> = new Map();
        const searchResultsDetails: SearchResultDetails[] = [];
        let lastHotels: HotelRaw[] = [];
        await searchResultQueryCursor.eachAsync((searchResultDoc: RawSearchResultDocument) => {
            const {searchId, createdAt, scrapingTimeSeconds, searchProcessTimeSeconds} = searchResultDoc;
            searchResultsDetails.push({searchId, createdAt, scrapingTimeSeconds, searchProcessTimeSeconds});
            lastHotels = [];
            searchResultDoc.hotels
                .forEach((hotelDoc) => {
                    // Not every hotel has price because not always 'not available' hotels are filtered out
                    if (hotelDoc.price) {
                        const hotelRaw = this.getHotelRaw(hotelDoc);
                        lastHotels.push(hotelRaw);
                        const {hotelId, price, tax} = hotelRaw;
                        if (pricesByHotelId.has(hotelId)) {
                            pricesByHotelId.get(hotelId).push({value: {price, tax}, date: createdAt});
                        } else {
                            pricesByHotelId.set(hotelId, [{value: {price, tax}, date: createdAt}]);
                        }
                    }
                });
        });

        if (!lastHotels.length) {
            return null;
        }

        const hotelsWithPrices: HotelWithHistoricalPrices[] = lastHotels.map(v =>
            ({...v, prices: pricesByHotelId.get(v.hotelId)}));

        return {
            searchResultsDetails,
            hotelsWithPrices,
        };
    }

    private getDetailsRangesByCreatedAt(searchResultsDetails: SearchResultDetails[]): { first: SearchResultDetails, last: SearchResultDetails } {
        const sortedDetails = searchResultsDetails.sort(this.ascendCreatedAtComparator);
        return {
            first: sortedDetails[0],
            last: sortedDetails[sortedDetails.length - 1],
        };
    }

    private createHotelsSummary(lastHotelsWithPrices: HotelWithHistoricalPrices[]): HotelSummaryDto[] {
        const formatter = new SearchResultFormatter();
        const hotelsSummary: HotelSummaryDto[] = [];
        lastHotelsWithPrices.forEach((hotel: HotelWithHistoricalPrices) => {
            const prices: ValueWithDate<number>[] = hotel.prices.map(({value, date}) =>
                ({value: this.priceParser.parse(value.price, value.tax), date}));
            const name = hotel.name.trim();
            const distanceFromCenterMeters = formatter.processDistance(hotel.distanceFromCenter);
            const districtName = formatter.processDistrictName(hotel.districtName);
            const coords = formatter.processCoords(hotel.coords);
            const starRating = formatter.parseStarRating(hotel.starRating);
            const newlyAdded = hotel.newlyAdded ? true : null;
            const lastPrice = this.priceParser.parse(hotel.price, hotel.tax);
            const lastRate = formatter.parseRate(hotel.rate);
            const lastSecondaryRateType = hotel.secondaryRateType ? hotel.secondaryRateType.trim() : null;
            const lastSecondaryRate = formatter.parseRate(hotel.secondaryRate);
            const lastPriceBeforeDiscount = this.priceParser.parse(hotel.priceWithoutDiscount);
            const lastNumberOfReviews = formatter.parseNumberOfReviews(hotel.numberOfReviews);
            const lastBonuses = formatter.parseBonuses(hotel.bonuses);
            const lastBonusesOld = formatter.parseBonusesOld(hotel.bonuses);
            const lastRooms = formatter.parseRooms(hotel.rooms);
            const calcPrices = this.calcPrices(prices.map(v => v.value));
            const avgPriceDiff = this.roundToTwoDecimalPlaces(calcPrices.avg - lastPrice);
            const maxPriceDiff = this.roundToTwoDecimalPlaces(calcPrices.max - lastPrice);
            const hotelSummary = HotelSummaryDtoBuilder.get()
                .hotelId(hotel.hotelId)
                .name(name)
                .distanceFromCenterMeters(distanceFromCenterMeters)
                .districtName(districtName)
                .coords(coords)
                .hotelLink(hotel.hotelLink)
                .propertyType(hotel.propertyType)
                .starRating(starRating)
                .newlyAdded(newlyAdded)
                .lastPrice(lastPrice)
                .lastRate(lastRate)
                .lastSecondaryRateType(lastSecondaryRateType)
                .lastSecondaryRate(lastSecondaryRate)
                .lastPriceBeforeDiscount(lastPriceBeforeDiscount)
                .lastNumberOfReviews(lastNumberOfReviews)
                .lastBonuses(lastBonuses)
                .lastBonusesOld(lastBonusesOld)
                .lastRooms(lastRooms)
                .avgPrice(calcPrices.avg)
                .minPrice(calcPrices.min)
                .maxPrice(calcPrices.max)
                .avgPriceDiff(avgPriceDiff)
                .maxPriceDiff(maxPriceDiff)
                .prices(prices)
                .build();
            hotelsSummary.push(hotelSummary);
        });
        return hotelsSummary;
    }

    private getHotelRaw = (hotelDoc: RawHotelDocument): HotelRaw =>
        HotelRawBuilder.get()
            .hotelId(hotelDoc.hotelId)
            .name(hotelDoc.name)
            .price(hotelDoc.price)
            .tax(hotelDoc.tax)
            .distanceFromCenter(hotelDoc.distanceFromCenter)
            .districtName(hotelDoc.districtName)
            .coords(hotelDoc.coords)
            .hotelLink(hotelDoc.hotelLink)
            .rate(hotelDoc.rate)
            .secondaryRateType(hotelDoc.secondaryRateType)
            .secondaryRate(hotelDoc.secondaryRate)
            .priceWithoutDiscount(hotelDoc.priceWithoutDiscount)
            .numberOfReviews(hotelDoc.numberOfReviews)
            .propertyType(hotelDoc.propertyType)
            .starRating(hotelDoc.starRating)
            .newlyAdded(hotelDoc.newlyAdded)
            .bonuses(hotelDoc.bonuses)
            .rooms(hotelDoc.rooms && hotelDoc.rooms.length
                ? hotelDoc.rooms
                    .map(({description, personCount, beds}: RawRoomDocument) =>
                        RoomRawBuilder.get()
                            .description(description)
                            .personCount(personCount)
                            .beds(beds)
                            .build())
                : null)
            .build()

    private roundToTwoDecimalPlaces = (value: number): number => Math.round(value * 100) / 100;
    private calcAvgValue = (array: number[]): number => array.reduce((a, b) => a + b) / array.length;

    private calcPrices(prices: number[]): { min: number, max: number, avg: number } {
        const averagePrice = prices.length > 0
            ? this.calcAvgValue(prices)
            : null;
        return {
            min: Math.min(...prices),
            max: Math.max(...prices),
            avg: this.roundToTwoDecimalPlaces(averagePrice),
        };
    }

    private ascendCreatedAtComparator = (q1: { createdAt: string },
                                         q2: { createdAt: string }): -1 | 0 | 1 =>
        q1.createdAt === q2.createdAt ? 0 : q1.createdAt < q2.createdAt ? -1 : 1
}*/

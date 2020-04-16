/*
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OccupancyStatus } from './enum/OccupancyStatus';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SearchRequestDocument, SearchRequestSchemaKey } from '@bo/common';

@Injectable()
export class SearchRequestMaintainerService {

    constructor(@InjectModel(SearchRequestSchemaKey) private readonly searchRequestModel: Model<SearchRequestDocument>) {
    }

    public occupyAndGetUpdatedRequest(searchId: string): Observable<SearchRequestDocument> {
        return from(this.searchRequestModel.findOneAndUpdate({ searchId },
            {
                occupancyStatus: OccupancyStatus.BUSY,
                occupancyUpdatedAt: new Date().toISOString(),
            } as SearchRequestDocument, { new: true }).exec());
    }

    public findNewSearchRequest(searchId: string): Observable<SearchRequestDocument | null> {
        return from(this.searchRequestModel.findOne({
            searchId,
            occupancyStatus: OccupancyStatus.FREE,
        } as SearchRequestDocument).exec());
    }

    public freeSearchRequest(searchId: string): Observable<SearchRequestDocument> {
        return from(this.searchRequestModel.findOneAndUpdate(
            { searchId } as SearchRequestDocument,
            { occupancyStatus: OccupancyStatus.FREE } as SearchRequestDocument,
            { new: true }));
    }

    public getFreeAndValidatedSearchRequest(): Observable<SearchRequestDocument | null> {
        return from(this.searchRequestModel.find({ occupancyStatus: OccupancyStatus.FREE } as SearchRequestDocument)
            .sort({ occupancyUpdatedAt: 1 })
            .exec())
            .pipe(
                map((docs) => docs
                    .filter(this.isExceededFrequencyThreshold)
                    .sort(this.descPriorityComparator)),
                tap((docs) => console.debug(`Found '${docs.length}' free search requests (in order): `,
                    docs.map((doc) => this.mapDoc(doc)))),
                map((docs) => {
                    const now = new Date();
                    return docs.filter((doc) => this.isNotInPast(doc, now));
                }),
                map((docs) => {
                    if (docs.length) {
                        console.debug(`There are '${docs.length}' validated search requests. Validated search requests (in order): `,
                            docs.map((doc) => this.mapDoc(doc)));
                        return docs[0];
                    } else {
                        return null;
                    }
                }),
            );
    }

    // Newly created search request should be also consider as valid queue - because has 'occupancyUpdatedAt' = null
    private isExceededFrequencyThreshold = (doc: SearchRequestDocument): boolean =>
        !doc.occupancyUpdatedAt ||
        new Date(doc.occupancyUpdatedAt) < new Date(Date.now() - (doc.updateFrequencyMinutes * 60000))

    private descPriorityComparator = (q1: SearchRequestDocument,
                                      q2: SearchRequestDocument): -1 | 0 | 1 =>
        q1.priority === q2.priority ? 0 : q1.priority < q2.priority ? 1 : -1

    private isNotInPast({ searchId, checkInDate }: SearchRequestDocument, now: Date): boolean {
        const { day, month, year } = checkInDate;
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth() + 1; // JS returns month as array index :)
        const nowDay = now.getDate();
        if (nowYear > year
            || (nowYear === year) && (nowMonth > month)
            || (nowYear === year) && (nowMonth === month) && nowDay > day) {
            console.warn(`Search request with id: ${searchId} Check in date: year: ${year}, month: ${month}, day: ${day} is in the past.`);
            return false;
        }
        return true;
    }

    private mapDoc = ({ searchId, priority, occupancyUpdatedAt }: SearchRequestDocument) => ({
        searchId,
        priority,
        occupancyUpdatedAt,
    })
}
*/

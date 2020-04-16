import { Injectable } from '@nestjs/common';
/*import { interval, merge, Observable, of, ReplaySubject } from 'rxjs';
import { first, startWith, switchMap, tap } from 'rxjs/operators';
import { SearchRequestMaintainerService } from './search-request-maintainer.service';
import { LockSemaphoreService } from '../lock/lock-semaphore.service';
import { ASKING_FOR_FREE_SEARCH_REQUEST_INTERVALS_SECONDS } from '../config';
import { OccupancyStatus } from './enum/OccupancyStatus';
import { SearchRequestDocument, SearchRequestStatusDto, SocketClient, StatusEvent } from '@bo/common';

@Injectable()
export class SearchRequestTempService {

    private readonly searchRequestSubject: ReplaySubject<SearchRequestDocument>;

    constructor(
        private readonly searchRequestMaintainerService: SearchRequestMaintainerService,
        private readonly lockSemaphoreService: LockSemaphoreService,
        private readonly socketClient: SocketClient,
    ) {
        this.searchRequestSubject = new ReplaySubject<SearchRequestDocument>(1);
    }

    public acquireSearchRequest(): void {
        merge(
            this.askForFreeSearchRequestInIntervals(ASKING_FOR_FREE_SEARCH_REQUEST_INTERVALS_SECONDS * 1000),
            this.watchForNewRequest(),
        ).pipe(
            first<SearchRequestDocument>(Boolean),
            tap((doc) => console.info('Successfully acquired search request: ', doc)),
            tap((doc) => this.searchRequestSubject.next(doc)),
        ).subscribe();
    }

    public onSearchRequest = () => this.searchRequestSubject.asObservable();

    public freeSearchRequestAndNotify(searchId: string): void {
        this.searchRequestMaintainerService.freeSearchRequest(searchId).pipe(
            tap((doc) => console.debug(`Occupancy status of search request with id ${doc.searchId}} was set to ${OccupancyStatus.FREE}`)),
        ).subscribe((doc: SearchRequestDocument) => {
            this.socketClient.sendIfConnected<SearchRequestStatusDto>(StatusEvent.SEARCH_REQUEST_UPDATE, {
                timestamp: Date.now(),
                searchId: doc.searchId,
            });
        });
    }

    private askForFreeSearchRequestInIntervals(intervalMs: number): Observable<SearchRequestDocument> {
        return interval(intervalMs).pipe(
            startWith(0),
            tap(() => console.debug(`Requesting for free search request.`)),
            switchMap(() =>
                this.lockActionAndOccupyRequestAfterSuccessfulAcquisition(
                    this.searchRequestMaintainerService.getFreeAndValidatedSearchRequest()),
            ),
        );
    }

    private watchForNewRequest(): Observable<SearchRequestDocument> {
        return this.socketClient.watchEvent<SearchRequestStatusDto>(StatusEvent.NEW_SEARCH_REQUEST).pipe(
            tap((doc) => console.debug(`New search request event received, searchId: [${doc.searchId}]`)),
            switchMap(({ searchId }: SearchRequestStatusDto) =>
                this.lockActionAndOccupyRequestAfterSuccessfulAcquisition(
                    this.searchRequestMaintainerService.findNewSearchRequest(searchId),
                ),
            ),
        );
    }

    private lockActionAndOccupyRequestAfterSuccessfulAcquisition(action: Observable<SearchRequestDocument | null>): Observable<SearchRequestDocument> {
        return this.lockSemaphoreService.lockProcessingAction(
            action.pipe(
                switchMap((doc: SearchRequestDocument) => {
                    if (doc && doc.searchId) {
                        return this.searchRequestMaintainerService.occupyAndGetUpdatedRequest(doc.searchId).pipe(
                            tap(({ searchId }: SearchRequestDocument) =>
                                this.socketClient.sendIfConnected<SearchRequestStatusDto>(StatusEvent.SEARCH_REQUEST_UPDATE, {
                                    timestamp: Date.now(),
                                    searchId,
                                })),
                        );
                    } else {
                        return of(null);
                    }
                }),
            ) as Observable<SearchRequestDocument>,
        );
    }
}*/

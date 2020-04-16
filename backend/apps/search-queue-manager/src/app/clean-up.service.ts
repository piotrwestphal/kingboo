import { Injectable } from '@nestjs/common';
import { from, interval } from 'rxjs';
import { filter, startWith, switchMap, tap } from 'rxjs/operators';
import { OccupancyStatus } from '../core/model/OccupancyStatus';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { SearchRequestSchemaKey } from '../db/schema/search-request.schema';
import { SearchRequestDocument } from '../db/interface/searchRequest.document';

@Injectable()
export class CleanUpService {

  // TODO: rework and remove unnecessary things
  constructor(
    @InjectModel(SearchRequestSchemaKey) private readonly searchRequestModel: Model<SearchRequestDocument>,
  ) {
  }

  public start(cleaningUpIntervalMin: number, expiredRequestOccupancyMin: number): void {
    const cleaningUpIntervalMs = cleaningUpIntervalMin * 60000;
    const expiredRequestOccupancyMs = expiredRequestOccupancyMin * 60000;
    console.info(`Invoking automatic cleaning up mechanism. ` +
      `Cleaning will be performed every [${cleaningUpIntervalMin}] minutes. ` +
      `Expired requests occupancy will be free after [${expiredRequestOccupancyMin}] minutes of idle status.`);
    interval(cleaningUpIntervalMs).pipe(
      startWith(0),
      tap((counter) => console.debug(`Clean up process start. Clean up has been performed [${counter}] times.`)),
      // switchMap(() => this.lockSemaphoreService.lockProcessingAction(
      //   from(this.cleanUpExpiredRequestsAndNotify(expiredRequestOccupancyMs))),
      // ),
    ).subscribe(() => {
      console.debug('Clean up process finish.');
    });
  }

  /**
   * Set 'occupancyStatus' value of search requests with expired occupancy to 'FREE'.
   */
  public async cleanUpExpiredRequestsAndNotify(expiredThresholdMs: number): Promise<void> {
    const lessThanOccupancyMin = Date.now() - expiredThresholdMs;
    const foundSearchRequests = await this.searchRequestModel.find(
      {
        occupancyStatus: { $ne: OccupancyStatus.FREE },
        // occupancyUpdatedAt: { $lt: lessThanOccupancyMin },
      }).exec();

    if (foundSearchRequests && foundSearchRequests.length) {
      // await AsyncHelper.forEach(foundSearchRequests, async (searchRequestDocument: SearchRequestDocument) => {
      //     const updatedReq = await this.searchRequestModel.findOneAndUpdate(
      //         { searchId: searchRequestDocument.searchId } as SearchRequestDocument,
      //         { occupancyStatus: OccupancyStatus.FREE } as SearchRequestDocument,
      //         { new: true });
      // this.socketClient.sendIfConnected<SearchRequestStatusDto>(StatusEvent.SEARCH_REQUEST_UPDATE, {
      //     timestamp: Date.now(),
      //     searchId: searchRequestDocument.searchId,
      // });
      // logger.info(`Occupancy status: '${searchRequestDocument.occupancyStatus}' for search queue with searchId: ` +
      //     `'${updatedReq.searchId}', was set to '${updatedReq.occupancyStatus}' because of occupancy expiration.`);
    };
  }
}

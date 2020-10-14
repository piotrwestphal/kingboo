import { TopHotelsDto } from '@kb/model';

export class TopHotelsCache {
  constructor(
    readonly searchId: string,
    readonly collectingStartedAt: string,
    readonly collectingFinishedAt: string,
    readonly topHotels: TopHotelsDto,
    readonly updatedAt?: Date,
  ) {
  }
}

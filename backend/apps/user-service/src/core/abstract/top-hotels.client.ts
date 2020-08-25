import { TopHotelsDto } from '@kb/model';

export abstract class TopHotelsClient {
  abstract getTopHotels(searchId: string): Promise<TopHotelsDto>;
}

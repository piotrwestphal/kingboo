import { ScrapActivity } from "../model/ScrapActivity";

export abstract class ScrapActivityRepository {
  abstract find(searchId: string): Promise<ScrapActivity | null>;

  abstract create(scrapActivity: ScrapActivity): Promise<ScrapActivity>;

  abstract update(scrapActivity: ScrapActivity): Promise<ScrapActivity>;

  abstract findLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<string[]>;

  abstract deleteMany(searchIds: string[]): Promise<number>;
}

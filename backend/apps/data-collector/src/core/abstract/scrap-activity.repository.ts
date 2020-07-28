import { ScrapActivity } from "../model/ScrapActivity";

export abstract class ScrapActivityRepository {

  abstract createOrUpdate(searchId: string, scrapActivity: ScrapActivity): Promise<ScrapActivity>;

  abstract update(searchId: string, scrapActivity: ScrapActivity): Promise<ScrapActivity>;

  abstract findLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<string[]>;

  abstract deleteMany(searchIds: string[]): Promise<number>;
}

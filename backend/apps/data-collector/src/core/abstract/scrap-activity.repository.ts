import { ScrapActivity } from '../model/ScrapActivity';

export abstract class ScrapActivityRepository {
  abstract update(searchId: string, scrapActivity: ScrapActivity): Promise<ScrapActivity>;
}

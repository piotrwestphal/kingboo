import { ScrapActivity } from '../../core/model/ScrapActivity';
import { ScrapActivityDocument } from './scrap-activity.document'

export class ScrapActivityMapper {
  toDoc({
          searchId,
          scrapingStartedAt,
          scrapingFinishedAt,
        }: ScrapActivity): ScrapActivityDocument {
    return {
      searchId,
      scrapingStartedAt,
      scrapingFinishedAt,
    }
  }

  fromDoc({
            searchId,
            scrapingStartedAt,
            scrapingFinishedAt,
          }: ScrapActivityDocument): ScrapActivity {
    return new ScrapActivity(
      searchId,
      scrapingStartedAt,
      scrapingFinishedAt,
    )
  }
}

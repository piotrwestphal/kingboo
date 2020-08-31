import { ScrapActivity } from '../../core/model/ScrapActivity';
import { SaveScrapActivity } from './save-scrap-activity';
import { ScrapActivityDocument } from './scrap-activity.document';

export class ScrapActivityDocumentMapper {
  toScrapActivity({
                    searchId,
                    scrapingStartedAt,
                    scrapingFinishedAt,
                  }: ScrapActivityDocument): ScrapActivity {
    return ScrapActivity.create({
      searchId,
      scrapingStartedAt: scrapingStartedAt ? new Date(scrapingStartedAt) : null,
      scrapingFinishedAt: scrapingFinishedAt ? new Date(scrapingFinishedAt) : null,
    })
  }

  prepareForSave({
                   searchId,
                   scrapingStartedAt,
                   scrapingFinishedAt,
                 }: ScrapActivity): SaveScrapActivity {
    return {
      searchId,
      scrapingStartedAt,
      scrapingFinishedAt,
    }
  }
}

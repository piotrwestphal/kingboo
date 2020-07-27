import { ScrapActivity } from '../../core/model/ScrapActivity';
import { SaveScrapActivity } from './save-scrap-activity';
import { ScrapActivityDocument } from './scrap-activity.document';

export class ScrapActivityDocumentMapper {
  toScrapActivity({
                    searchId,
                    scrapStartedAt,
                    scrapFinishedAt,
                  }: ScrapActivityDocument): ScrapActivity {
    return ScrapActivity.create({
      searchId,
      scrapStartedAt: scrapStartedAt ? new Date(scrapStartedAt): null,
      scrapFinishedAt: scrapFinishedAt ? new Date(scrapFinishedAt) : null,
    })
  }

  prepareForSave({
                   searchId,
                   scrapStartedAt,
                   scrapFinishedAt,
                 }: ScrapActivity): SaveScrapActivity {
    return {
      searchId,
      scrapStartedAt,
      scrapFinishedAt,
    }
  }
}

import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository';
import { ScrapActivity } from '../core/model/ScrapActivity';
import { Model } from 'mongoose';
import { ScrapActivityDocument } from './scrap-activity/scrap-activity.document';
import { ScrapActivityDocumentMapper } from './scrap-activity/scrap-activity-document.mapper';

export class MongoScrapActivityRepository extends ScrapActivityRepository {

  constructor(
    private readonly mapper: ScrapActivityDocumentMapper,
    private readonly model: Model<ScrapActivityDocument>,
  ) {
    super();
  }

  find(searchId: string): Promise<ScrapActivity> {
    return this.model.findOne({ searchId })
      .map(doc => doc ? this.fromDoc(doc) : null).exec();
  }

  async create(scrapActivity: ScrapActivity): Promise<ScrapActivity> {
    const saveScrapActivity = this.mapper.prepareForSave(scrapActivity);
    const saved = await new this.model(saveScrapActivity).save();
    return this.fromDoc(saved);
  }

  update(scrapActivity: ScrapActivity): Promise<ScrapActivity> {
    const saveScrapActivity = this.mapper.prepareForSave(scrapActivity);
    return this.model.findOneAndUpdate(
      { searchId: scrapActivity.searchId },
      saveScrapActivity,
      { new: true })
      .map(doc => this.fromDoc(doc)).exec()
  }

  private fromDoc = (doc: ScrapActivityDocument) => this.mapper.toScrapActivity(doc);
}

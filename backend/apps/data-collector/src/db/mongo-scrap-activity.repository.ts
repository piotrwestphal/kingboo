import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository';
import { ScrapActivity } from '../core/model/ScrapActivity';
import { Model } from 'mongoose';
import { ScrapActivityDocument } from './scrap-activity/scrap-activity.document';
import { ScrapActivityDocumentMapper } from './scrap-activity/scrap-activity-document.mapper';

export class MongoScrapActivityRepository extends ScrapActivityRepository {

  private readonly DAY = 24 * 60 * 60 * 1000;

  constructor(
    private readonly mapper: ScrapActivityDocumentMapper,
    private readonly model: Model<ScrapActivityDocument>,
  ) {
    super();
  }

  findLastUpdatedGivenDaysAgo(now: Date, days: number): Promise<string[]> {
    const offset = new Date(now.valueOf() - days * this.DAY); // x days ago
    return this.model.find({
      updatedAt: { $lte: offset },
    })
      .map(docs => docs.map(v => v.searchId))
      .exec()
  }

  async createOrUpdate(searchId: string, scrapActivity: ScrapActivity): Promise<ScrapActivity> {
    const saveScrapActivity = this.mapper.prepareForSave(scrapActivity);
    const saved = await this.model.update(
      { searchId },
      saveScrapActivity,
      { upsert: true });
    return this.fromDoc(saved);
  }

  async update(searchId: string, scrapActivity: ScrapActivity): Promise<ScrapActivity> {
    const saveScrapActivity = this.mapper.prepareForSave(scrapActivity);
    const found = await this.model.findOneAndUpdate(
      { searchId },
      saveScrapActivity,
      { new: true })
      .exec()
    return this.fromDoc(found);
  }

  private fromDoc = (doc: ScrapActivityDocument) => this.mapper.toScrapActivity(doc);

  async deleteMany(searchIds: string[]): Promise<number> {
    const deleted = await this.model.deleteMany(
      { searchId: { $in: searchIds } }).exec();
    return deleted.deletedCount;
  }
}

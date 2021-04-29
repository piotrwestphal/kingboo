import { AppConfigService } from '../config/app-config.service'
import { CassandraClient } from '@kb/cassandra'
import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository'
import { ScrapActivity } from '../core/model/ScrapActivity'
import { ScrapActivityMapper } from './scrap-activity/scrap-activity.mapper'
import { ScrapActivityDocument } from './scrap-activity/scrap-activity.document'

export class CassandraScrapActivityRepository extends ScrapActivityRepository {

  private readonly DAY_IN_SECONDS = 24 * 60 * 60

  constructor(
    private readonly cassandraClient: CassandraClient,
    private readonly config: AppConfigService,
    private readonly mapper: ScrapActivityMapper,
  ) {
    super()
  }

  async update(searchId: string, scrapActivity: ScrapActivity): Promise<ScrapActivity> {
    const { scrapingStartedAt, scrapingFinishedAt } = this.mapper.toDoc(scrapActivity)
    const retentionTimeSec = this.config.scrapActivitiesWithoutUpdateRetentionDays * this.DAY_IN_SECONDS
    await this.cassandraClient.execute(
      `INSERT INTO kingboo.scrap_activity ("searchId", "scrapingStartedAt", "scrapingFinishedAt")
       VALUES (:searchId, :scrapingStartedAt, :scrapingFinishedAt) USING TTL :ttl;`,
      { searchId, scrapingStartedAt, scrapingFinishedAt, ttl: retentionTimeSec })
    const result = await this.cassandraClient.findFirst<ScrapActivityDocument>(
      `SELECT *
       from kingboo.scrap_activity
       WHERE "searchId" = :searchId
       LIMIT :count;`,
      { searchId, count: 1 })
    return this.mapper.fromDoc(result)
  }
}

import { AppConfigService } from '../config/app-config.service'
import { ScrapActivityRepository } from '../core/abstract/scrap-activity.repository'
import { ScrapActivity } from '../core/model/ScrapActivity'
import { ScrapActivityMapper } from './scrap-activity/scrap-activity.mapper'
import { ScrapActivityDocument } from './scrap-activity/scrap-activity.document'
import { mapping } from 'cassandra-driver'
import { TimeHelper } from '@kb/util'
import ModelMapper = mapping.ModelMapper

export class CassandraScrapActivityRepository extends ScrapActivityRepository {

  constructor(
    private readonly cassandraMapper: ModelMapper<ScrapActivityDocument>,
    private readonly config: AppConfigService,
    private readonly mapper: ScrapActivityMapper,
  ) {
    super()
  }

  async update(searchId: string, scrapActivity: ScrapActivity): Promise<ScrapActivity> {
    const scrapActivityDoc = this.mapper.toDoc(scrapActivity)
    const retentionTimeSec = this.config.scrapActivitiesWithoutUpdateRetentionHours * TimeHelper.HOUR_IN_SEC
    await this.cassandraMapper.insert(scrapActivityDoc, { ttl: retentionTimeSec })
    const result = await this.cassandraMapper.find({ searchId })
    return this.mapper.fromDoc(result.first())
  }
}

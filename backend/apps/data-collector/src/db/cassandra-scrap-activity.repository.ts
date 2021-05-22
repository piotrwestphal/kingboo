import { AppConfigService } from '../config/app-config.service'
import { mapping } from 'cassandra-driver'
import { TimeHelper } from '@kb/util'
import ModelMapper = mapping.ModelMapper

export class CassandraScrapActivityRepository  {

  constructor(
    private readonly cassandraMapper: ModelMapper<any>,
    private readonly config: AppConfigService,
    private readonly mapper: any,
  ) {
  }

  async update(searchId: string, scrapActivity: any): Promise<any> {
    const scrapActivityDoc = this.mapper.toDoc(scrapActivity)
    const retentionTimeSec = 24 * TimeHelper.HOUR_IN_SEC
    await this.cassandraMapper.insert(scrapActivityDoc, { ttl: retentionTimeSec })
    const result = await this.cassandraMapper.find({ searchId })
    return this.mapper.fromDoc(result.first())
  }
}

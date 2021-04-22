import { TopHotelsDto } from '@kb/model'

export abstract class TopHotelsRepository {
  abstract findBySearchIds(searchIds: string[]): Promise<TopHotelsDto[]>
}

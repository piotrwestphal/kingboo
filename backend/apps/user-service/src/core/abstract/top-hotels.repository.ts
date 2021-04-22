import { TopHotelsDto } from '@kb/model'

export abstract class TopHotelsRepository {
  abstract findAllBySearchIds(searchIds: string[]): Promise<TopHotelsDto[]>
}

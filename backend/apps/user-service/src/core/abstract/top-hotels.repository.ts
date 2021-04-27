import { TopHotelsDto } from '@kb/model'

export abstract class TopHotelsRepository {
  abstract findBySearchId(searchId: string): Promise<TopHotelsDto>
}

import { TopHotelsDto } from '@kb/model'

export abstract class TopHotelsRepository {
  abstract find(searchId: string): Promise<TopHotelsDto | null>
}

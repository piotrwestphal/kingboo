import { CyclicSearch } from '../model/CyclicSearch'

export abstract class CyclicSearchRepository {
  abstract findAll(): Promise<CyclicSearch[]>
  abstract findByCyclicId(cyclicId: string): Promise<CyclicSearch>
  abstract findByCyclicSearchRequest(searchId: string): Promise<CyclicSearch | null>
  abstract create(cyclicSearch: CyclicSearch): Promise<CyclicSearch>
  abstract update(cyclicSearch: CyclicSearch): Promise<CyclicSearch>
  abstract delete(cyclicId: string): Promise<CyclicSearch | null>
}

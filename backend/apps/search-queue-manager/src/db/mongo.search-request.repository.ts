import { SearchRequestRepository } from '../core/interface/search-request.repository';

export class MongoSearchRequestRepository extends SearchRequestRepository {
  findById(): object {
    return null;
  }
}

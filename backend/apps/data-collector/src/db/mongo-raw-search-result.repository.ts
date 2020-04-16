import { Model } from 'mongoose';
import { RawSearchResultDocument } from './raw-search-result';

export class MongoRawSearchResultRepository {

  constructor(
    private readonly rawSearchResultModel: Model<RawSearchResultDocument>,
  ) {
  }

}

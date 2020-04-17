import { Model } from 'mongoose';
import { RawSearchResultDocument } from './raw-search-result';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { RawSearchResult } from '../core/model/RawSearchResult';

export class MongoRawSearchResultRepository extends RawSearchResultRepository {

  constructor(
    private readonly rawSearchResultModel: Model<RawSearchResultDocument>,
  ) {
    super();
  }

  // This method is in a prevent form - because sometimes it takes very long to throw an error when a save to cloud db process failed
  public async create(rawSearchResult: RawSearchResult): Promise<void> {
    // TODO: remove null values before save
    return new Promise<void>(async (resolve, reject) => {
      const thresholdMs = 15000;
      const timeout = setTimeout(() =>
          reject(`Cannot save search result with search id: ${rawSearchResult.searchId} to db in ${thresholdMs / 1000} sec.`),
        thresholdMs);
      new this.rawSearchResultModel(rawSearchResult).save((err) => {
        if (err) console.error(`Error when saving search result with search id: ${rawSearchResult.searchId} to db`, err);
        clearTimeout(timeout);
        resolve();
      });
    });
  }

}

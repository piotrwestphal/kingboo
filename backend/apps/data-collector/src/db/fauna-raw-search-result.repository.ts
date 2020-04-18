import { FaunaClient } from '@kb/fauna-client';
import { query as q, values } from 'faunadb';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { RawSearchResult } from '../core/model/RawSearchResult';
import Page = values.Page;
import Document = values.Document;

export class FaunaRawSearchResultRepository extends RawSearchResultRepository {

  constructor(
    private readonly faunaClient: FaunaClient,
  ) {
    super();
  }

  // TODO: can not pass js objects with methods
  async create(rawSearchResult: RawSearchResult): Promise<void> {
    const saved = await this.faunaClient.query<object>(
      q.Create(
        q.Collection('raw-search-results'),
        {
          data: {
            searchId: rawSearchResult.searchId,
            searchPlaceIdentifier: rawSearchResult.searchId,
            collectingTimeSec: rawSearchResult.collectingTimeSec,
            hotelsCount: rawSearchResult.hotelsCount,
            hotels: rawSearchResult.hotels.map(v =>
              ({
                bonuses: v.bonuses,
                price: v.price,
              })),
          },
        },
      ),
    ).catch(reason => console.log(reason));
    console.log('FAUNA created result!! ', saved);
  }

  // TODO: example
  getAll() {
    return this.faunaClient.query<Page<Document<{}>>>(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('all_raw-search-results'),
          ),
        ),
        q.Lambda('rsr', q.Get(q.Var('rsr'))),
      ),
    ).catch((err) => console.error('ERROR when receiving users: ', err));
  }
}

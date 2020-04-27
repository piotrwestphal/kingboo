import { FaunaClient } from '@kb/fauna-client';
import { query as q, values } from 'faunadb';
import { RawSearchResultRepository } from '../core/abstract/raw-search-result.repository';
import { RawSearchResult } from '../core/model/RawSearchResult';
import { RawSearchResultDocument } from './interface/raw-search-result.document';
import { RawSearchResultMapper } from './raw-search-result.mapper';
import Page = values.Page;
import Document = values.Document;
import { logger } from '../logger';

export class FaunaRawSearchResultRepository extends RawSearchResultRepository {

  constructor(
    private readonly faunaClient: FaunaClient,
    private readonly rawSearchResultMapper: RawSearchResultMapper,
  ) {
    super();
  }

  async create(rawSearchResult: RawSearchResult): Promise<void> {
    const rawSearchResultDocument = this.rawSearchResultMapper.fromRawSearchResult(rawSearchResult);
    return this.faunaClient.query<Document<RawSearchResultDocument>>(
      q.Create(
        q.Collection('raw-search-results'),
        { data: rawSearchResultDocument }))
      .then((v) => logger.info(`Raw search result with id [${v.data.searchId}] was saved.`))
      .catch(reason => logger.error('Error when saving raw search results', reason));
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
    ).catch((err) => logger.error('ERROR when receiving users: ', err));
  }
}

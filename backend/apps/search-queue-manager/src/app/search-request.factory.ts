import { SearchRequest } from '../core/model/SearchRequest';
import { SearchIdentifierBuilder } from '../core/search-identifier.builder';
import { OccupancyStatus } from '../core/model/OccupancyStatus';
import { CreateSearchRequest } from '../core/interface/create-search-request';
import { CheckDate } from '../core/interface/check-date';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { searchRequestValidationSchemaMap } from './validation.schema';
import { NotAcceptableException } from '@nestjs/common';

export class SearchRequestFactory {

  constructor(
    private readonly searchIdentifierBuilder: SearchIdentifierBuilder,
  ) {
  }

  createNew(createSearchRequest: CreateSearchRequest): SearchRequest {
    const newRequest = SearchRequest.create({
      ...createSearchRequest,
      checkInDate: this.mapCheckDate(createSearchRequest.checkInDate),
      checkOutDate: this.mapCheckDate(createSearchRequest.checkOutDate),
      searchId: this.searchIdentifierBuilder.createIdentifier(createSearchRequest),
      searchPlaceIdentifier: null,
      occupancyStatus: OccupancyStatus.BUSY,
      occupancyUpdatedAt: new Date(),
    });
    return this.validate(searchRequestValidationSchemaMap, newRequest);
  }

  private validate(schemaMap: SchemaMap, value: SearchRequest): SearchRequest {
    const { error, value: validated } = Joi.object<SearchRequest>(schemaMap).validate(value);
    if (error) {
      throw new NotAcceptableException(`Search request validation error: ${error.message}`);
    }
    return validated;
  }

  private mapCheckDate = ({ year, month, day }: CheckDate): Date => new Date(year, (month - 1), day);
}

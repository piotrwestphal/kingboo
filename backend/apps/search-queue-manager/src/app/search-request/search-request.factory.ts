import { SearchRequest } from '../../core/model/SearchRequest';
import { SearchIdentifierBuilder } from '../../core/search-identifier.builder';
import { CreateSearchRequest } from './create-search-request';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { NotAcceptableException } from '@nestjs/common';
import { SearchRequestType } from '../../core/model/SearchRequestType';
import { createSearchRequestValidationSchemaMap } from './validation.schema';

export class SearchRequestFactory {

  constructor(
    private readonly searchIdentifierBuilder: SearchIdentifierBuilder,
  ) {
  }

  createNew(type: SearchRequestType, createSearchRequest: CreateSearchRequest): SearchRequest {
    const valid = this.validate(createSearchRequestValidationSchemaMap, createSearchRequest);
    return SearchRequest.create({
      ...valid,
      searchId: this.searchIdentifierBuilder.createIdentifier({ type, ...createSearchRequest }),
      type,
      checkInDate: createSearchRequest.checkInDate,
      checkOutDate: createSearchRequest.checkOutDate,
      searchPlaceIdentifier: null,
      nextSearchScheduledAt: new Date(),
      collectingStartedAt: null,
      collectingFinishedAt: null,
    });
  }

  private validate(schemaMap: SchemaMap<CreateSearchRequest>, value: CreateSearchRequest): CreateSearchRequest {
    const { error, value: validated } = Joi.object<CreateSearchRequest>(schemaMap).validate(value);
    if (error) {
      throw new NotAcceptableException(`Search request validation error: ${error.message}`);
    }
    return validated;
  }

}

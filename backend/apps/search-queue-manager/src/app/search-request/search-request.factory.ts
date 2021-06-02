import { SearchRequest } from '../../core/model/SearchRequest';
import { SearchIdentifierBuilder } from '../../core/search-identifier.builder';
import { CreateSearchRequest } from './create-search-request';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { NotAcceptableException } from '@nestjs/common';
import { SearchRequestType } from '../../core/model/SearchRequestType';
import {
  collectingHotelsScenarioRequestValidationSchemaMap,
  collectingPlaceScenarioRequestValidationSchemaMap
} from './validation-schemas';
import { SearchIdentifierComponents } from '../../core/interface/search-identifier-components'
import { CollectingScenarioType } from '@kb/model'

const withCollectHotelsScenarioType = (type: SearchRequestType, createSearchRequest: CreateSearchRequest): SearchIdentifierComponents => ({
  ...createSearchRequest,
  type,
  resultsLimit: createSearchRequest.resultsLimit,
})

const withCollectPlaceScenarioType = (type: SearchRequestType, createSearchRequest: CreateSearchRequest): SearchIdentifierComponents => ({
  ...createSearchRequest,
  type,
  resultsLimit: 1,
})

type ScenarioFactory = [
  validation: SchemaMap<CreateSearchRequest>,
  mapper: (type: SearchRequestType, createSearchRequest: CreateSearchRequest) => SearchIdentifierComponents,
]

export const scenarioFactories: { [key in CollectingScenarioType]: ScenarioFactory } = {
  [CollectingScenarioType.COLLECT_HOTELS]: [collectingHotelsScenarioRequestValidationSchemaMap, withCollectHotelsScenarioType],
  [CollectingScenarioType.COLLECT_PLACE]: [collectingPlaceScenarioRequestValidationSchemaMap, withCollectPlaceScenarioType]
}

export class SearchRequestFactory {

  constructor(
    private readonly searchIdentifierBuilder: SearchIdentifierBuilder,
  ) {
  }

  createNew(type: SearchRequestType,
            createSearchRequest: CreateSearchRequest): SearchRequest {
    const scenarioType = createSearchRequest.scenarioType
    const [validationSchema, mapper] = scenarioFactories[scenarioType]
    const valid = this.validate(validationSchema, createSearchRequest);
    const searchIdentifierComponents = mapper(type, valid)
    return SearchRequest.create({
      ...searchIdentifierComponents,
      searchId: this.searchIdentifierBuilder.createIdentifier(searchIdentifierComponents),
      type,
      checkInDate: createSearchRequest.checkInDate,
      checkOutDate: createSearchRequest.checkOutDate,
      searchPlaceIdentifier: null,
      nextSearchScheduledAt: new Date(),
      collectingStartedAt: null,
      collectingFinishedAt: null,
      collectingCount: 0,
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

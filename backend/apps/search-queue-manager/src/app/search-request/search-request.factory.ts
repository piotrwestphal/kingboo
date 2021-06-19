import { SearchRequest } from '../../core/model/SearchRequest';
import { SearchIdentifierBuilder } from '../../core/search-identifier.builder';
import { CreateSearchRequest } from './create-search-request';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { NotAcceptableException } from '@nestjs/common';
import { SearchRequestType } from '../../core/model/SearchRequestType';
import {
  baseValidationSchemaMap,
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
    this.preValidate(createSearchRequest)
    const scenarioType = createSearchRequest.scenarioType
    const [validationSchema, searchIdComponentsMapper] = scenarioFactories[scenarioType]
    this.validate(validationSchema, createSearchRequest);
    const searchIdComponents = searchIdComponentsMapper(type, createSearchRequest)
    return SearchRequest.create({
      ...searchIdComponents,
      searchId: this.searchIdentifierBuilder.createIdentifier(searchIdComponents),
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

  private preValidate(createSearchRequest: CreateSearchRequest): void {
    this.validate(baseValidationSchemaMap, createSearchRequest, true)
  }

  private validate(schemaMap: SchemaMap<CreateSearchRequest>, value: CreateSearchRequest, allowUnknown = false): void {
    const { error } = Joi.object<CreateSearchRequest>(schemaMap).validate(value, {allowUnknown});
    if (error) {
      throw new NotAcceptableException(`Search request validation error: ${error.message}`);
    }
  }
}

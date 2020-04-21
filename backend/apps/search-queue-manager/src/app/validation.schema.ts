import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { SearchRequest } from '../core/model/SearchRequest';

export const searchRequestValidationSchemaMap: SchemaMap<SearchRequest> = {
  searchId: Joi.string().required(),
};

import { CyclicIdentifierBuilder } from '../../core/cyclic-identifier.builder';
import { CreateCyclicSearch } from './create-cyclic-search';
import { CyclicSearch } from '../../core/model/CyclicSearch';
import * as Joi from '@hapi/joi';
import { SchemaMap } from '@hapi/joi';
import { NotAcceptableException } from '@nestjs/common';
import { cyclicSearchValidationSchemaMap } from './validation.schema';

export class CyclicSearchFactory {

  constructor(
    private readonly cyclicIdentifierBuilder: CyclicIdentifierBuilder,
  ) {
  }

  createNew(createCyclicSearch: CreateCyclicSearch): CyclicSearch {
    const valid = this.validate(cyclicSearchValidationSchemaMap, createCyclicSearch);
    return CyclicSearch.create({
      ...valid,
      cyclicId: this.cyclicIdentifierBuilder.createIdentifier(createCyclicSearch),
      cyclicSearchRequests: [],
    });
  }

  private validate(schemaMap: SchemaMap<CreateCyclicSearch>, value: CreateCyclicSearch): CreateCyclicSearch {
    const { error, value: validated } = Joi.object<CreateCyclicSearch>(schemaMap).validate(value);
    if (error) {
      throw new NotAcceptableException(`Cyclic search validation error: ${error.message}`);
    }
    return validated;
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SearchResult } from './interface/searchResult';
import { RawSearchResultDocument, RawSearchResultSchemaKey } from '../db/raw-search-result';

@Injectable()
export class SearchResultService {

    constructor(@InjectModel(RawSearchResultSchemaKey) private readonly rawSearchResultModel: Model<RawSearchResultDocument>) {
    }

    public async create(searchResult: SearchResult): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const thresholdMs = 15000;
            const timeout = setTimeout(() =>
                    reject(`Cannot save search result with search id: ${searchResult.searchId} to db in ${thresholdMs / 1000} sec.`),
                thresholdMs);
            new this.rawSearchResultModel(searchResult).save((err) => {
                if (err) console.error(`Error when saving search result with search id: ${searchResult.searchId} to db`, err);
                clearTimeout(timeout);
                resolve();
            });
        });
    }
}

import { Schema } from 'mongoose';
import { ScrapActivityDocument } from './scrap-activity.document';

export const ScrapActivitySchemaKey = 'scrapActivity';

export const ScrapActivitySchema = new Schema<ScrapActivityDocument>({
    searchId: String,
    scrapingStartedAt: Date,
    scrapingFinishedAt: Date,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  });

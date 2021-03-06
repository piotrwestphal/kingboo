import { ProcessingProgressDocument } from './processing-progress.document';
import { Schema } from 'mongoose';

export const ProcessingProgressSchemaKey = 'processingProgress';

export const ProcessingProgressSchema = new Schema<ProcessingProgressDocument>({
    searchId: String,
    type: String,
    data: Object,
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  });

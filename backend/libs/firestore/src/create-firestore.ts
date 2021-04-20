import { Firestore } from '@google-cloud/firestore';

export const createFirestore = (projectId: string,
                                keyFilename: string): Firestore => new Firestore({
  projectId,
  keyFilename,
});

export const createFirestoreForDevPurposes = (projectId: string,
                                              host: string,
                                              port: number): Firestore => new Firestore({
  projectId,
  host,
  port,
  ssl: false,
  customHeaders: {
    'Authorization': 'Bearer owner',
  },
});

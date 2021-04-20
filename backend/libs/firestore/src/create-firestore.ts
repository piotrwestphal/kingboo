import { Firestore } from '@google-cloud/firestore';

export const createFirestore = (projectId: string,
                                serviceAccountKeyJson: string): Firestore => new Firestore({
  projectId,
  credentials: JSON.parse(serviceAccountKeyJson),
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

import { Firestore } from '@google-cloud/firestore';

export const createFirestore = (projectId: string,
                                clientEmail: string,
                                clientKey: string): Firestore => new Firestore({
  projectId,
  credentials: {
    client_email: clientEmail,
    private_key: clientKey,
  },
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

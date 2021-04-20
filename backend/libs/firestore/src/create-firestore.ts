import { Firestore } from '@google-cloud/firestore';

export const createFirestore = (projectId: string,
                                client_email: string,
                                private_key): Firestore => new Firestore({
  projectId,
  credentials: {
    client_email,
    private_key
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

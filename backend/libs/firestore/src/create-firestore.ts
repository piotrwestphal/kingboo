import { Firestore } from '@google-cloud/firestore';

export const createFirestore = (projectId: string,
                                clientEmail: string,
                                clientKey: string) => new Firestore({
  projectId,
  credentials: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_email: clientEmail,
    // eslint-disable-next-line @typescript-eslint/camelcase
    private_key: clientKey,
  },
});

export const createFirestoreForDevPurposes = (projectId: string,
                                              host: string,
                                              port: number) => new Firestore({
  projectId,
  host,
  port,
  ssl: false,
  customHeaders: {
    'Authorization': 'Bearer owner',
  },
});

import { Firestore } from '@google-cloud/firestore';
import { parseFirestorePemKey } from './pem-key.parser'

export const createFirestore = (projectId: string,
                                client_email: string,
                                rawClientKey: string): Firestore => new Firestore({
  projectId,
  credentials: {
    client_email,
    // fix for differences in setting env variable in app engine and github actions
    private_key: parseFirestorePemKey(rawClientKey)
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

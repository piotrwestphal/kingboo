import { Firestore } from '@google-cloud/firestore';
import { parsePemKey } from '@kb/util'

export const createFirestore = (projectId: string,
                                client_email: string,
                                rawClientKey: string): Firestore => new Firestore({
  projectId,
  credentials: {
    client_email,
    private_key: parsePemKey(rawClientKey)
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

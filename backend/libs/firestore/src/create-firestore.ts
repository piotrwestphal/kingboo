import { FirestoreConfigService } from '@kb/firestore/firestore-config.service';
import { Firestore } from '@google-cloud/firestore';

export const createFirestore = (configService: FirestoreConfigService) => new Firestore({
  projectId: configService.projectId,
  credentials: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_email: configService.clientEmail,
    // eslint-disable-next-line @typescript-eslint/camelcase
    private_key: configService.clientKey,
  },
});

export const createFirestoreForDevPurposes = (configService: FirestoreConfigService) => new Firestore({
  projectId: configService.projectId,
  host: configService.host,
  port: configService.port,
  ssl: false,
  customHeaders: {
    "Authorization": "Bearer owner",
  }
})

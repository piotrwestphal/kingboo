import { NodeEnv } from '@kb/config';

export interface FirestoreConfigService {
  env: NodeEnv;
  host: string;
  port: number;
  projectId: string;
  clientEmail: string;
  clientKey: string;
}

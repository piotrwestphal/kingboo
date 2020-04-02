import { Client, errors, query as q } from 'faunadb';
import { defer } from 'rxjs';
import { FetchError } from 'node-fetch';
import { FaunaAdminDbOptions } from '@kb/config';
import { handleRetry } from '@kb/fauna-client/utils/handle-retry';
import BadRequest = errors.BadRequest;
import InternalError = errors.InternalError;

export async function createClientForDevPurposes(faunaDbOptions: FaunaAdminDbOptions,
                                                 dbName: string): Promise<Client> {
  return defer(async () => {
    const adminClient = new Client(faunaDbOptions);
    try {
      const { secret } = await adminClient.query<{ secret: string }>(q.CreateKey({
        database: q.Database(dbName),
        role: 'server',
      }));
      return new Client({ ...faunaDbOptions, secret });
    } catch (err) {
      if (err instanceof FetchError) {
        console.error(`Unable to create key for given fauna db name: ${dbName}.`, err);
        console.log('Waiting for fauna db to be reachable...');
      } else if (err instanceof BadRequest) {
        console.error(`Db with given name ${dbName} not exist.`, err.message);
        console.log(`Waiting for db with name ${dbName} to be created...`);
      } else if (err instanceof InternalError) {
        console.error(`Fauna Db is not initialized.`, err.message);
        console.log(`Waiting for fauna to be initialized...`);
      } else {
        console.error('Error when connecting to fauna db.', err);
        console.log('Waiting for fauna db to be ready...');
      }
      throw err;
    }
  }).pipe(
    handleRetry(60, 5000),
  ).toPromise();
}

export function createClient(secret: string): Client {
  return new Client({ secret });
}

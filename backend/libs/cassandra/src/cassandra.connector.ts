import { Client } from 'cassandra-driver'
import { CommonLoggerService } from '@kb/logger'
import { defer, Observable } from 'rxjs'
import { delay, retryWhen, scan } from 'rxjs/operators'

export const connectToCassandra = async (cassandra: Client, logger: CommonLoggerService): Promise<Client> => {
  const retryAttempts = 12
  const retryDelay = 5000
  return defer(async () => {
    try {
      await cassandra.connect()
      logger.info(`Successfully connected to cassandra`)
      return cassandra
    } catch (err) {
      logger.error(`Error when connecting to cassandra`, err)
      logger.info(`Waiting for cassandra to be ready`)
      throw err
    }
  }).pipe(
    handleRetry(retryAttempts, retryDelay),
  ).toPromise()
}

function handleRetry(retryAttempts: number,
                     retryDelay: number): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount, error) => {
            if (errorCount + 1 >= retryAttempts) {
              throw error
            }
            return errorCount + 1
          }, 0),
          delay(retryDelay),
        ),
      ),
    )
}

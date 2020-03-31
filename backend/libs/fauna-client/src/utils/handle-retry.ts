import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';

export function handleRetry(retryAttempts: number,
                            retryDelay: number): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount, error) => {
            if (errorCount + 1 >= retryAttempts) {
              throw error;
            }
            return errorCount + 1;
          }, 0),
          delay(retryDelay),
        ),
      ),
    );
}

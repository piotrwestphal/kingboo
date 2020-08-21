import { useEffect, useState } from 'react';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export function useFetch<T, K>(url: string, mapper: (t: T) => K, opts?: RequestInit): [K, boolean, boolean] {
  const [response, setResponse] = useState(null) as any
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setLoading(true)
    console.log({ url })
    from(fetch(url, opts)).pipe(
      switchMap((res) => {
        console.log({res})
        console.log('text: ', res.text())
        if (res) {
          return res.json() as Promise<T>
        } else {
          return throwError('there is no payload')
        }
      }),
      map(mapper),
      catchError((err) => {
        console.error(err);
        setHasError(true);
        setLoading(false);
        return of(null);
      })
    ).subscribe((v) => {
      console.log({ v });
      setResponse(v);
      setLoading(false)
    })
  }, [opts, url, mapper, setResponse])
  return [response, loading, hasError]
}

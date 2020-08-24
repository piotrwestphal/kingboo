import { useEffect, useState } from 'react';
import { from, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export function useFetch<T>(url: string, opts?: RequestInit): [T, boolean, boolean] {
  const [response, setResponse] = useState(null) as any
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setLoading(true)
    console.log({ url })
    from(fetch(url, opts)).pipe(
      switchMap((res) => {
        if (res.ok) {
          return res.json() as Promise<T>
        } else {
          console.error(res)
          return throwError('there is no payload')
        }
      }),
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
  }, [opts, url, setResponse])
  return [response, loading, hasError]
}

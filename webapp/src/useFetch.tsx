import { useEffect, useState } from 'react';
import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export function useFetch<T>(url: string, opts?: RequestInit): [T[], boolean, boolean] {
  const [response, setResponse] = useState(null) as any
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    setLoading(true)
    from(fetch(url, opts)).pipe(
      switchMap((res) => res.json() as Promise<object>),
      catchError((err) => {
        console.error(err);
        setHasError(true);
        setLoading(false);
        return of(null);
      })
    ).subscribe((v) => {
      console.log({v});
      setResponse(v);
      setLoading(false)
    })
  }, [opts, url])
  return [response, loading, hasError]
}

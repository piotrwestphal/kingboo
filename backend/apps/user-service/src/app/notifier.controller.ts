import { Controller, Sse } from '@nestjs/common'
import { interval, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// https://docs.nestjs.com/techniques/server-sent-events
// https://medium.com/tokopedia-engineering/implementing-server-sent-events-in-reactjs-c36661d89468
// https://developer.mozilla.org/en-US/docs/Web/API/EventSource
@Controller('api/v1/search-data')
export class NotifierController {

  @Sse('sse')
  sse(): Observable<any> {
    return interval(1000).pipe(
      map((_) => ({
        data: {hello: `world ${_}`}
      }))
    )
  }
}

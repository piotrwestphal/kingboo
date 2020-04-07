import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export abstract class RmqClientProxy<Pattern, Payload> extends ClientProxy {
  emit<Result, Payload>(pattern: Pattern, payload: Payload): Observable<Result> {
    return super.emit(pattern, payload);
  }
}

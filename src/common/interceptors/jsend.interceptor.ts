import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JSend } from '../utils/jsend.util';

@Injectable()
export class JSendInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If already a JSend response, return as is
        if (
          data?.status === 'success' ||
          data?.status === 'fail' ||
          data?.status === 'error'
        ) {
          return data;
        }
        // Wrap non-JSend responses in success
        return JSend.success(data);
      }),
    );
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // Success
      map((response) => ({
        success: true,
        message: response.message || 'Success',
        data: response.data || response,
      })),
      //Error
      catchError((err) => {
        if (err instanceof HttpException) {
          const response = err.getResponse() as any;
          return of({
            success: false,
            message: response?.message || err.message,
            statusCode: err.getStatus(),
            data: null,
          });
        }

        return of({
          success: false,
          message: err.message || 'Internal server error',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          data: null,
        });
      }),
    );
  }
}

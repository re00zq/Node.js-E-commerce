import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { JSend } from '../utils/jsend.util';

@Catch()
export class JSendExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // If already a JSend response, use it
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;
    if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'status' in exceptionResponse &&
      (exceptionResponse.status === 'fail' ||
        exceptionResponse.status === 'error')
    ) {
      return response.status(status).json(exceptionResponse);
    }

    // Convert to JSend error
    const message = exception.message || 'Internal server error';
    response.status(status).json(JSend.error(message));
  }
}

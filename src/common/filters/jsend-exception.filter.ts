import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { I18nValidationException } from 'nestjs-i18n';
import { I18nService } from 'nestjs-i18n';
import { JSend } from '../utils/jsend.util';

@Catch()
export class JSendExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    // Handle I18nValidationException
    if (exception instanceof I18nValidationException) {
      const lang = request.headers['accept-language'] || 'en'; // Default to 'en' if no language header
      const validationErrors = await Promise.all(
        exception.errors.map(async (error) => {
          // Check if constraints exist, fallback to empty object if undefined
          const constraints = error.constraints ?? {};
          return {
            property: error.property,
            constraints: Object.fromEntries(
              await Promise.all(
                Object.entries(constraints).map(async ([key, value]) => [
                  key,
                  await this.i18n.translate(value as string, { lang }),
                ]),
              ),
            ),
          };
        }),
      );

      return response.status(HttpStatus.BAD_REQUEST).json(
        JSend.fail({
          errors: validationErrors,
        }),
      );
    }

    // Use existing JSend response if already formatted
    if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'status' in exceptionResponse &&
      (exceptionResponse.status === 'fail' ||
        exceptionResponse.status === 'error')
    ) {
      return response.status(status).json(exceptionResponse);
    }

    // Fallback: Wrap any other error into JSend
    const message =
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
        ? (exceptionResponse as any).message
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    return response.status(status).json(JSend.error(message));
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { JSend } from '../utils/jsend.util';

export class JSendFailException extends HttpException {
  constructor(data: any, statusCode: number = HttpStatus.BAD_REQUEST) {
    super(JSend.fail(data), statusCode);
  }
}

export class JSendErrorException extends HttpException {
  constructor(
    message: string,
    code?: number,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(JSend.error(message, code), statusCode);
  }
}

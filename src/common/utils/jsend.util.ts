import {
  JSendSuccess,
  JSendFail,
  JSendError,
} from '../interfaces/jsend.interface';

export class JSend {
  static success<T>(data: T): JSendSuccess<T> {
    return { status: 'success', data };
  }

  static fail<T>(data: T): JSendFail<T> {
    return { status: 'fail', data };
  }

  static error(message: string, code?: number): JSendError {
    return { status: 'error', message, ...(code && { code }) };
  }
}

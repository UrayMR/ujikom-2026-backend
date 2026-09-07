import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const statusMessage =
      exception instanceof HttpException
        ? exception.message || 'Error ' + statusCode
        : 'Internal server error';

    let errors: string | object = 'An unexpected error occurred';
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      errors =
        typeof errorResponse === 'object' && errorResponse !== null
          ? (errorResponse as any).message || errorResponse
          : errorResponse;
    } else if (exception instanceof Error) {
      errors = exception.message;
    }

    response.status(statusCode).json({
      success: false,
      code: statusCode,
      message: statusMessage,
      error: errors,
    });
  }
}

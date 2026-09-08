import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
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

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'object' && errorResponse !== null) {
        const body = errorResponse as {
          message?: string;
          errors?: unknown;
        };

        // Validation error
        if (body.errors) {
          return response.status(statusCode).json({
            success: false,
            code: statusCode,
            message: body.message ?? 'Validation failed',
            errors: body.errors,
          });
        }

        // HttpException biasa
        return response.status(statusCode).json({
          success: false,
          code: statusCode,
          message:
            typeof body.message === 'string' ? body.message : exception.message,
        });
      }

      return response.status(statusCode).json({
        success: false,
        code: statusCode,
        message:
          typeof errorResponse === 'string' ? errorResponse : exception.message,
      });
    }

    // Unexpected error
    return response.status(500).json({
      success: false,
      code: 500,
      message: 'Internal server error',
    });
  }
}

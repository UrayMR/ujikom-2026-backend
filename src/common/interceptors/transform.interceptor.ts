import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponseDto } from '../dto/api-response.dto.js';
import { ApiResponse } from '../responses/api-response.js';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  ApiResponse<T>,
  ApiResponseDto<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<ApiResponse<T>>,
  ): Observable<ApiResponseDto<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result): ApiResponseDto<T> => ({
        success: true,
        code: response.statusCode,
        message: result.message,
        data: result.data,
      })),
    );
  }
}

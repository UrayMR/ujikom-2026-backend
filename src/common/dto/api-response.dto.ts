import { HttpStatus } from '@nestjs/common';

export class ApiResponseDto<T> {
  success: boolean;
  code: HttpStatus;
  message: string;
  data: T;

  constructor(success: boolean, message: string, code: HttpStatus, data: T) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

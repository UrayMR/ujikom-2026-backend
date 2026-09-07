export class ApiResponseDto<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

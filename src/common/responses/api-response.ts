export class ApiResponse<T> {
  constructor(
    public readonly message: string = 'Request successful',
    public readonly data: T = null as T,
  ) {}
}

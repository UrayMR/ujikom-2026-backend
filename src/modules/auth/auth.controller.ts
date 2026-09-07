import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import type { JwtPayload } from './interfaces/jwt-payload.interface.js';
import { Public } from '../shared/decorators/public.decorator.js';
import { ApiResponse } from '../../common/responses/api-response.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return new ApiResponse('Login Successful', user);
  }

  @Get('test')
  async testAuth(@CurrentUser() user: JwtPayload) {
    return new ApiResponse('You are authenticated', user);
  }
}

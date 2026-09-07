import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { Public } from '../shared/decorators/public.decorator.js';
import { ApiResponse } from '../../common/responses/api-response.js';
import type { AuthenticatedUser } from './interfaces/authenticated-user.interface.js';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    const user = await this.authService.login(loginDto);

    await new Promise<void>((resolve, reject) => {
      request.session.regenerate((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    request.session.userId = user.id;

    return new ApiResponse('Login Successful', user);
  }

  @Get('me')
  async me(@CurrentUser() user: AuthenticatedUser) {
    return new ApiResponse('You are authenticated', user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request) {
    await new Promise<void>((resolve, reject) => {
      request.session.destroy((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    return new ApiResponse('Logout Successful', null);
  }
}

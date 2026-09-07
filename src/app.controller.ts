import { Controller, Get } from '@nestjs/common';
import { Public } from './modules/shared/decorators/public.decorator.js';

@Controller()
export class AppController {
  @Public()
  @Get()
  root() {
    return {
      message: 'API for Ujikom-2026',
    };
  }

  @Public()
  @Get('health')
  health() {
    return {
      message: 'Server is running',
    };
  }
}

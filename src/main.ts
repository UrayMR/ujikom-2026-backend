import { NestFactory } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Global Prefix
  app.setGlobalPrefix('api');

  // Apply class-transformer decorators like @Exclude on entities
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new TransformInterceptor(),
  );

  // Http Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.APP_PORT ?? 3000);
}
await bootstrap();

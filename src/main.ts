import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Api Response Transform Interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.APP_PORT ?? 3000);
}
await bootstrap();

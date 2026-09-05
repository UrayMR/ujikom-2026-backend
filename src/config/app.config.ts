import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'NestJS',
  key: process.env.APP_KEY || 'default_app_key',
  environment: process.env.APP_ENV || 'development',
  port: process.env.APP_PORT || '3000',

  apiPrefix: process.env.API_PREFIX || 'api',
  versioning: {
    enable: process.env.VERSIONING_ENABLE === 'true' || false,
    type: process.env.VERSIONING_TYPE || 'URI',
    defaultVersion: process.env.VERSIONING_DEFAULT_VERSION || '1',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  logging: {
    enable: process.env.LOGGING_ENABLE === 'true' || false,
    level: process.env.LOGGING_LEVEL || 'log',
  },
  swagger: {
    enable: process.env.SWAGGER_ENABLE === 'true' || false,
    title: process.env.SWAGGER_TITLE || 'NestJS API',
    version: process.env.SWAGGER_VERSION || '1.0',
  },
}));

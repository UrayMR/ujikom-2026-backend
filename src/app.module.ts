import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { EmployeeModule } from './modules/employee/employee.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@modules/users/users.module.js';
import { AuthModule } from '@modules/auth/auth.module.js';
import appConfig from '@config/app.config.js';
import databaseConfig from '@config/database.config.js';
import authConfig from '@config/auth.config.js';
import { DatabaseType } from 'typeorm';
import { SharedModule } from '@modules/shared/shared.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

// Get environment file path based on APP_ENV
const getEnvFilePath = () => {
  const env = process.env.APP_ENV || 'development';
  if (env === 'production') return '.env.production';
  if (env === 'staging') return '.env.staging';
  return '.env';
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('database.type') as DatabaseType as any,
        host: configService.get<string>('database.host'),
        port: configService.get<string>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize:
          configService.get<string>('app.environment') === 'development',
      }),
      inject: [ConfigService],
    }),

    SharedModule,
    UsersModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

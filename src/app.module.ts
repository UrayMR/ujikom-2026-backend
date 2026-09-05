import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeeModule } from './modules/employee/employee.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // development only, set to false in production
      }),
      inject: [ConfigService], // Inject ConfigService into useFactory
    }),

    UsersModule,
    EmployeeModule,
    AuthModule,

    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    //   ObserveModule.forRoot({
    //     appKey: process.env.OBSERVE_APP_KEY ?? '',
    //     appSecret: process.env.OBSERVE_APP_SECRET ?? '',
    //     serviceId: 'nest-typescript-starter',
    //   }),
    //   EmployeeModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

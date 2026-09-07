import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmSessionStore } from './stores/typeorm-session.store.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity.js';

@Global()
@Module({
  imports: [UsersModule, ConfigModule, TypeOrmModule.forFeature([Session])],
  providers: [AuthService, TypeOrmSessionStore],
  controllers: [AuthController],
  exports: [AuthService, TypeOrmSessionStore],
})
export class AuthModule {}

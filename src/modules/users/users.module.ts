import { Module } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service.js';
import { UsersController } from '@modules/users/users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/users/entities/user.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

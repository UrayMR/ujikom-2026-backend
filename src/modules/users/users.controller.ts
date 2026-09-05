// src/users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@modules/users/users.service.js';
import { CreateUserDto } from '@modules/users/dto/create-user.dto.js';
import { UpdateUserDto } from '@modules/users/dto/update-user.dto.js';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '@modules/auth/guards/roles.guard.js';
import { Roles } from '@modules/auth/decorators/roles.decorator.js';
import { RolesEnum } from '@modules/shared/enums/roles.enum.js';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolesEnum.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

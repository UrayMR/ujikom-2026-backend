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
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { RolesEnum } from '../shared/enums/roles.enum.js';
import { Auth } from '../shared/decorators/auth.decorator.js';
import { ApiResponse } from '../../common/responses/api-response.js';

@Controller('users')
@Auth(RolesEnum.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new ApiResponse('User created successfully', user);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return new ApiResponse('Users found successfully', users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new ApiResponse('User found successfully', user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return new ApiResponse('User updated successfully', user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return new ApiResponse('User deleted successfully');
  }
}

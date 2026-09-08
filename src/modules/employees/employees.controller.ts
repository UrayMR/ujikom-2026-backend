import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { RolesEnum } from '../shared/enums/roles.enum.js';
import { Auth } from '../shared/decorators/auth.decorator.js';
import { ApiResponse } from '../../common/responses/api-response.js';

@Controller('employees')
@Auth(RolesEnum.Admin)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeesService.create(createEmployeeDto);
    return new ApiResponse('Employee created successfully', employee);
  }

  @Get()
  async findAll() {
    const employees = await this.employeesService.findAll();
    return new ApiResponse('Employees data retrieved successfully', employees);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const employee = await this.employeesService.findOne(id);
    return new ApiResponse('Employee found successfully', employee);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const employee = await this.employeesService.update(id, updateEmployeeDto);
    return new ApiResponse('Employee updated successfully', employee);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.employeesService.remove(id);
    return new ApiResponse('Employee deleted successfully');
  }

  @Delete('bulk')
  async removeBulk(@Body() ids: string[]) {
    await this.employeesService.removeBulk(ids);
    return new ApiResponse('Employees deleted successfully');
  }
}

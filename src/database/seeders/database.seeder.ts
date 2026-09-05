import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../../app.module.js';
import { User } from '../../modules/users/entities/user.entity.js';
import { Employee } from '../../modules/employees/entities/employee.entity.js';
import { UserSeeder } from './user.seeder.js';
import { EmployeeSeeder } from './employee.seeder.js';

async function bootstrap() {
  console.log('[INFO] Seeding Database...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get(getRepositoryToken(User));
  const employeeRepository = app.get(getRepositoryToken(Employee));

  try {
    await UserSeeder.run(userRepository);
    await EmployeeSeeder.run(employeeRepository);

    console.log('[INFO] Seeding Successfully completed.');
  } catch (error) {
    console.error('[ERROR] Seeding Failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();

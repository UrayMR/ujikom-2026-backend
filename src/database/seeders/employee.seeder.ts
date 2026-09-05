import { Repository } from 'typeorm';
import { Employee } from '../../modules/employees/entities/employee.entity.js';
import { faker } from '@faker-js/faker';

export class EmployeeSeeder {
  static async run(employeeRepository: Repository<Employee>) {
    console.log('Seeding Employee...');

    const employeesData = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
    }));

    const employees = employeeRepository.create(employeesData);
    await employeeRepository.save(employees);

    console.log('Seeding Employee Completed.');
  }
}

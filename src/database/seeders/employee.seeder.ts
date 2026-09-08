import { Repository } from 'typeorm';
import { Employee } from '../../modules/employees/entities/employee.entity.js';
import { faker } from '@faker-js/faker';

export class EmployeeSeeder {
  static async run(employeeRepository: Repository<Employee>) {
    console.log('Seeding Employee...');

    const employeesData = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
      birthDate: faker.date.past().toISOString().slice(0, 10),
      gender: faker.person.gender(),
      salary: faker.number.int({ min: 5000000, max: 10000000 }),
    }));

    const employees = employeeRepository.create(employeesData);
    await employeeRepository.save(employees);

    console.log('Seeding Employee Completed.');
  }
}

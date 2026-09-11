import { Repository } from 'typeorm';
import { Employee } from '../../modules/employees/entities/employee.entity.js';
import { faker } from '@faker-js/faker';

export class EmployeeSeeder {
  static async run(employeeRepository: Repository<Employee>) {
    console.log('Seeding Employee...');

    const employeesData = Array.from({ length: 30 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number({ style: 'international' }),
      address: faker.location.streetAddress(),
      education: faker.helpers.arrayElement([
        'Tidak/Belum Pernah',
        'SD',
        'SMP',
        'SMA/SMK',
        'D1/D2/D3',
        'S1/D4',
        'S2',
        'S3',
      ]),
      birthDate: faker.date.birthdate({
        min: 20,
        max: 70,
        mode: 'age',
      }),
      gender: faker.helpers.arrayElement(['male', 'female']),
      salary: faker.number.int({
        min: 5000000,
        max: 10000000,
        multipleOf: 1000000,
      }),
    }));

    const employees = employeeRepository.create(employeesData);
    await employeeRepository.save(employees);

    console.log('Seeding Employee Completed.');
  }
}

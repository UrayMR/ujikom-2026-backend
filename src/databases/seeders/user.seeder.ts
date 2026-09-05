import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity.js';

export class UserSeeder {
  static async run(userRepository: Repository<User>) {
    console.log('Seeding UserSeeder...');
    const adminEmail = 'admin@admin.com';

    const existingAdmin = await userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('password123', 10);

      const adminUser = userRepository.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });

      await userRepository.save(adminUser);
      console.log('Seeding User Seeder Completed.');
    } else {
      console.log('Seeding User Seeder Failed (Admin user already exists).');
    }
  }
}

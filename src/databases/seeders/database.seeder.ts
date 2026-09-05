import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../../app.module.js';
import { User } from '../../modules/users/entities/user.entity.js';
import { UserSeeder } from './user.seeder.js';

async function bootstrap() {
  console.log('[INFO] Seeding Database...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const userRepository = app.get(getRepositoryToken(User));

  try {
    await UserSeeder.run(userRepository);

    console.log('[INFO] Seeding Successfully completed.');
  } catch (error) {
    console.error('[ERROR] Seeding Failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();

import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwt: {
    secret:
      process.env.JWT_SECRET_KEY || process.env.APP_KEY || 'default_app_key',
    expiresIn: process.env.JWT_EXPIRES_IN || 900, // Default expiration time is 15 minutes (in seconds). You can adjust this value as needed.
  },
}));

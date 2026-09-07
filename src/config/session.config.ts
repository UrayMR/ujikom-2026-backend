import { registerAs } from '@nestjs/config';

export default registerAs('session', () => ({
  secret: process.env.SESSION_SECRET || process.env.APP_KEY || 'default-secret',
  maxAge: Number(process.env.SESSION_MAX_AGE ?? 86400000),
}));

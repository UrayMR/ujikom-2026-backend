import type { AuthenticatedUser } from '../../modules/auth/interfaces/authenticated-user.interface.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};

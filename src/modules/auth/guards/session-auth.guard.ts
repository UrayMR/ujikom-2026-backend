import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from '../../users/users.service.js';
import { IS_PUBLIC_KEY } from '../../shared/decorators/public.decorator.js';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const userId = request.session?.userId;

    if (!userId) {
      throw new UnauthorizedException('Unauthenticated');
    }

    const user = await this.usersService.findOne(userId);

    if (!user) {
      request.session.destroy(() => {});
      throw new UnauthorizedException('User not found');
    }

    request.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return true;
  }
}

import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../../../modules/auth/decorators/roles.decorator.js';
import { RolesGuard } from '../../../modules/auth/guards/roles.guard.js';
import { RolesEnum } from '../enums/roles.enum.js';

export function Auth(...roles: RolesEnum[]) {
  return applyDecorators(Roles(...roles), UseGuards(RolesGuard));
}

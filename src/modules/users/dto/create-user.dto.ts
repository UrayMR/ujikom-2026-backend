import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RolesEnum } from '../../../modules/shared/enums/roles.enum.js';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEnum(RolesEnum)
  role: RolesEnum;

  @IsString()
  @IsOptional()
  rememberToken?: string;
}

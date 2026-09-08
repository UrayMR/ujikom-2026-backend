import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  isEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsEnum(['male', 'female'])
  @IsNotEmpty()
  gender: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  salary: number;
}

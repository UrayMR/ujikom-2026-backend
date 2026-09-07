import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../modules/users/users.service.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validatePassword(userPassword: string, password: string) {
    return await bcrypt.compare(password, userPassword);
  }

  async login(loginDto: LoginDto) {
    if (!loginDto) {
      throw new BadRequestException('Email and password are required');
    }

    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);

    if (!user || !(await this.validatePassword(user.password, password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      ...payload,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

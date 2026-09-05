import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
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

  async login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;

    const user = await this.usersService.findByEmail(email);

    if (!user || !(await this.validatePassword(user.password, password))) {
      throw new Error('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

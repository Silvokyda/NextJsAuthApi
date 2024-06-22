import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(phoneNumber: string, password: string): Promise<any> {
    const user = await this.userService.createUser(phoneNumber, password);
    const { password: _, ...result } = user;
    return result;
  }

  async validateUser(phoneNumber: string, password: string): Promise<any> {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
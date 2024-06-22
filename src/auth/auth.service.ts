import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(phoneNumber: string, password: string): Promise<any> {
    const user = await this.userRepository.createUser(phoneNumber, password);
    const { password: _, ...result } = user;
    return result;
  }

  async validateUser(phoneNumber: string, password: string): Promise<any> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
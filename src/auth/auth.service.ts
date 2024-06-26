import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(phoneNumber: string, password: string) {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, phoneNumber: user.phoneNumber };
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: 3600,
    };
  }

  async signUp(phoneNumber: string, password: string): Promise<any> {
    try {
      const user = await this.userService.createUser(phoneNumber, password);
      const { password: _, ...result } = user;

      const payload = { sub: user.id, phoneNumber: user.phoneNumber };
      const accessToken = this.jwtService.sign(payload);

      return {
        user: result,
        access_token: accessToken,
        expiresIn: 3600,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Phone number already exists');
      }
      throw error; 
    }
  }

  async validateUser(phoneNumber: string, password: string): Promise<any> {
    console.log(`validateUser called with phoneNumber: ${phoneNumber}, password: ${password}`);
  
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    console.log('User found:', user);
  
    if (user && password) {
      console.log('Comparing passwords...');
      // decrypt user password and compare with the password provided
      const valid = await bcrypt.compare(password, user.password);
      console.log('Passwords compared:', valid);
      if (valid) { 
        const { password, ...result } = user;
        console.log('User validated:', result);
        return result;
      }
    }
    console.log('Validation failed');
    return null;
  }
}

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Request() req) {
    const { phoneNumber, password } = req.body;
    return this.authService.signUp(phoneNumber, password);
  }

  @Post('login')
  @UseGuards(AuthGuard('jwt'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

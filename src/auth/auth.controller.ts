import { Controller, Post, Body, UnauthorizedException, Request, UseGuards, HttpStatus, HttpException, ConflictException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: { phoneNumber: string, password: string }) {
    try {
      const result = await this.authService.signUp(body.phoneNumber, body.password);
      return { statusCode: HttpStatus.CREATED, data: result };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException({ message: error.message }, HttpStatus.CONFLICT);
      }
      throw new HttpException({ message: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body('phoneNumber') phoneNumber: string, @Body('password') password: string) {
    try {
      return this.authService.login(phoneNumber, password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}

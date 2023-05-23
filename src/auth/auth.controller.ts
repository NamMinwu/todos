import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SignIn } from 'src/dtos/create-user.dto';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signIn(@Body() signInDto: SignIn) {
    this.foo();
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  foo() {
    console.log('this');
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.authService.getProfile(req.user);
  }
}

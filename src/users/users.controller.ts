import { Body, ConflictException, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @ApiBody({ type: CreateUserDto })
  @Post()
  async signup(@Body() createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const hasEmail = await this.userService.findEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const hasName = await this.userService.findName(name);
    if (hasName) {
      throw new ConflictException('이미 사용중인 비밀번호 입니다.');
    }
    return await this.userService.create(createUserDto);
  }
}

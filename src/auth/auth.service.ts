import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Todo } from 'src/todos/entities/todo.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일를 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException('비밀번호를 확인해 주세요.');
    }
    const payload = { name: user.name, userId: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }

  async getProfile(userInf) {
    const user = await this.usersRepository.findOne({
      where: { id: userInf.userId },
      relations: ['todos'],
    });

    const profile = { name: user.name, todos: user.todos };
    return profile;
  }
}

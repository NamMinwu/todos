import { OmitType, PickType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class CreateUserDto extends OmitType(User, ['id']) {}

export class SignIn extends PickType(User, ['email', 'password']) {}

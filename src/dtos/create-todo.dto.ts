import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Todo } from 'src/todos/entities/todo.entity';

export class CreateTodoDto extends OmitType(Todo, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

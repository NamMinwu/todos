import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Todo } from 'src/todos/entities/todo.entity';

export class GetTodo {
  name: 'id';
  required: true;
  description: 'id';
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  async getTodo(todoId: string) {
    const todo = await this.todoRepository.findOne({
      where: { id: Number(todoId) },
    });
    return todo;
  }
}

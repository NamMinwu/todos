import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dtos/create-todo.dto';
import { Todo } from 'src/todos/entities/todo.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createTodo(userInf, createTodoDto: CreateTodoDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userInf.userId },
    });
    const todo = this.todoRepository.create(createTodoDto);
    todo.user = user;
    return await this.todoRepository.save(todo);
  }

  async showTodolist() {
    return await this.todoRepository.find();
  }
}

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from 'src/dtos/create-todo.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @ApiBody({ type: CreateTodoDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async createTodo(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.createTodo(req.user, createTodoDto);
  }

  @Get()
  async showTodolist() {
    return await this.todoService.showTodolist();
  }
}

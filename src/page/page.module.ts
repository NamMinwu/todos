import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { TodosService } from 'src/todos/todos.service';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}

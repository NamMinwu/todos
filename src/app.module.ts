import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

import { AuthModule } from './auth/auth.module';
import { Todo } from './todos/entities/todo.entity';
import { PageController } from './page/page.controller';

import { PageModule } from './page/page.module';

@Module({
  imports: [
    TodosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'fine-database.cahqndvvwy17.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'tkfekf1229',
      database: 'todos',
      entities: [User, Todo],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    PageModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

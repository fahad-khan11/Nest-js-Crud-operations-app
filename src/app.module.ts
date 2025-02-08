import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/crud-database'),
    TodosModule
  ],
})
export class AppModule {}

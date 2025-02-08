import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from '../schemas/todos.schemas.';
import { Types } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async createMany(createTodoDtos: CreateTodoDto[]): Promise<Todo[]> {
    const newTodos = this.todoModel.create(createTodoDtos);
    return newTodos;
  }
  
  
  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec(); 
  }

  async findOne(id: number): Promise<Todo | { message: string }> {
    const todo = await this.todoModel.findById(id).exec(); 
    return todo || { message: 'Todo not found' }; 
  }

  async update(id: string, updateTodo: UpdateTodoDto): Promise<Todo | { message: string }> {
    // Validate if the id is a valid MongoDB ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return { message: 'Invalid Todo ID' };
    }
  
    // Perform the update using the valid ObjectId
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodo, { new: true })
      .exec();
  
    return updatedTodo || { message: 'Todo not found' }; 
  }


  async remove(id: string): Promise<{ message: string }> {
    const result = await this.todoModel.findByIdAndDelete(id).exec(); 
    return result
      ? { message: 'Todo deleted successfully' } 
      : { message: 'Todo not found' }; 
  }
}

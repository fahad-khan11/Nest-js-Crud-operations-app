import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, GetTodoParam } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Todos') 
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
@ApiResponse({ status: 201, description: 'Todos created successfully.' })
create(@Body() todos: CreateTodoDto[]) {
  return this.todosService.createMany(todos);
}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all Todos.' })
  findAll() {
    return this.todosService.findAll();
  }

@Get(':id')
@ApiResponse({ status: 200, description: 'Todo retrieved successfully.' })
@ApiResponse({ status: 404, description: 'Todo not found.' })
findOne(@Param() params: GetTodoParam) {
  return this.todosService.findOne(params.id);
}

@Put(':id')
@ApiResponse({ status: 200, description: 'Todo updated successfully.' })
@ApiResponse({ status: 404, description: 'Todo not found.' })
update(@Param('id') id: string, @Body() updateTodo: UpdateTodoDto) {
  return this.todosService.update(id, updateTodo); // Pass the id as string
}


  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Todo deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}

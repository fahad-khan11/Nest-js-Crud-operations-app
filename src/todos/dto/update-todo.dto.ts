import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({ example: 1, description: 'Todo ID' })
  id: number;
}
export class GetTodoParam {
  id: number;
}
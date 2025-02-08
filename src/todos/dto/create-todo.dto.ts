import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Learn NestJS', description: 'Title of the Todo' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Complete the NestJS tutorial', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
export class GetTodoParam {
  id: number;
}

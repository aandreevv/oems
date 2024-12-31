import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchUsersRequest {
  @ApiProperty({ description: 'Username or full name (or part of them)' })
  @IsString()
  @IsNotEmpty()
  search: string;
}

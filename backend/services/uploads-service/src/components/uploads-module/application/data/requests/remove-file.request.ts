import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveFileRequest {
  @IsString()
  @IsNotEmpty()
  path: string;
}

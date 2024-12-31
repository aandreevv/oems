import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveProfileImageRequest {
  @IsString()
  @IsNotEmpty()
  path: string;
}

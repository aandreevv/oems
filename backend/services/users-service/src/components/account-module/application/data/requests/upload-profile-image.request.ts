import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { FileInterface } from '../interfaces/file.interface';

export class UploadProfileImageRequest {
  @IsObject()
  @IsNotEmpty()
  file: FileInterface;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;
}

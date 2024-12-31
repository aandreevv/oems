import { FileInterface } from '../interfaces/file.interface';
import { UploadTypeEnum } from '../enums/upload-type.enum';
import { IsEnum, IsNotEmpty, IsObject } from 'class-validator';

export class UploadFileRequest {
  @IsNotEmpty()
  @IsObject()
  file: FileInterface;

  @IsEnum(UploadTypeEnum)
  @IsNotEmpty()
  type: UploadTypeEnum;
}

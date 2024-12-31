import { Controller } from '@nestjs/common';
import { UploadFile } from '../application/usecases/upload-file.usecase';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UploadFileRequest } from '../application/data/requests/upload-file.request';
import { FileResponse } from '../application/data/responses/file.response';
import { RemoveFile } from '../application/usecases/remove-file.usecase';
import { RemoveFileRequest } from '../application/data/requests/remove-file.request';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadFileUsecase: UploadFile,
    private readonly removeFileUsecase: RemoveFile,
  ) {}

  @MessagePattern('upload_file')
  uploadFile(@Payload() payload: UploadFileRequest): Promise<FileResponse> {
    return this.uploadFileUsecase.execute(payload);
  }

  @MessagePattern('remove_file')
  removeFile(@Payload() payload: RemoveFileRequest): Promise<FileResponse> {
    return this.removeFileUsecase.execute(payload);
  }
}

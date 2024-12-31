import { Injectable } from '@nestjs/common';
import { UploadServicePort } from '../../ports/upload-service.port';
import { UploadFileRequest } from '../data/requests/upload-file.request';
import { FileResponse } from '../data/responses/file.response';

@Injectable()
export class UploadFile {
  constructor(private readonly uploadService: UploadServicePort) {}

  async execute({ file, type }: UploadFileRequest): Promise<FileResponse> {
    const uploadedPath = await this.uploadService.upload(file, type);
    return { path: uploadedPath };
  }
}

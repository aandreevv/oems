import { Injectable } from '@nestjs/common';
import { UploadServicePort } from '../../ports/upload-service.port';
import { FileResponse } from '../data/responses/file.response';
import { RemoveFileRequest } from '../data/requests/remove-file.request';

@Injectable()
export class RemoveFile {
  constructor(private readonly uploadService: UploadServicePort) {}

  async execute({ path }: RemoveFileRequest): Promise<FileResponse> {
    const removedPath = await this.uploadService.remove(path);
    return { path: removedPath };
  }
}

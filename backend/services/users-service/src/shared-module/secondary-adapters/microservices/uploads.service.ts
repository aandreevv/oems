import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UPLOADS_SERVICE } from '../../../constants/services';
import { UploadProfileImageRequest } from '../../../components/account-module/application/data/requests/upload-profile-image.request';
import { Observable } from 'rxjs';
import { UploadResponse } from '../../application/responses/upload.response';
import { RemoveProfileImageRequest } from '../../../components/account-module/application/data/requests/remove-profile-image.request';

@Injectable()
export class UploadsService {
  constructor(@Inject(UPLOADS_SERVICE) private readonly uploadsService: ClientProxy) {}

  uploadFile(payload: UploadProfileImageRequest): Observable<UploadResponse> {
    return this.uploadsService.send('upload_file', payload);
  }

  removeFile(payload: RemoveProfileImageRequest): Observable<UploadResponse> {
    return this.uploadsService.send('remove_file', payload);
  }
}

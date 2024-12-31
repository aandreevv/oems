import { Module } from '@nestjs/common';
import { UploadServicePort } from './ports/upload-service.port';
import { FirebaseUploadServiceAdapter } from './secondary-adapters/firebase-upload-service.adapter';
import { UploadFile } from './application/usecases/upload-file.usecase';
import { UploadsController } from './primary-adapters/uploads.controller';
import { RemoveFile } from './application/usecases/remove-file.usecase';

@Module({
  providers: [
    { provide: UploadServicePort, useClass: FirebaseUploadServiceAdapter },
    UploadFile,
    RemoveFile,
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}
